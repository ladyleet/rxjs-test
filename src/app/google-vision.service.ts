import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { apiKey } from './api.key';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GoogleVisionService {

  constructor(private http: Http) { }


  annotateImage(imgBase64: string): Observable<string[]> {
    const body = JSON.stringify({
      requests: [
        {
          image: {
            content: imgBase64
          },
          features: [
            {
              type: 'LABEL_DETECTION'
            }
          ]
        }
      ]
    });
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Content-Length', body.length.toString());

    return this.http.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      body
    )
    .map(res => res.json())
    .map(e => {
      if (!e.responses) {
        return [];
      } else {
        const results = e.responses.reduce((results, response) => {
          if (!response.labelAnnotations) {
            return results;
          }
          return results.concat(response.labelAnnotations.map(a => a.description).filter(a => !!a));
        }, []);

        const s = new Set<string>(results);
        return Array.from(s.values());
      }
    });
  }
}


