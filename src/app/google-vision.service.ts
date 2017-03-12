import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { apiKey } from './api.key';

@Injectable()
export class GoogleVisionService {

  constructor(private http: Http) { }


  annotateImage(imgBase64: string) {
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
    ).map(res => res.json())
    .map(e => {
      if (!e.responses) {
        return [];
      } else {
        return e.responses.reduce((labels, resp) => {
          return labels.concat(
            resp.labelAnnotations ?
              resp.labelAnnotations.reduce((labels, label) => {
                labels.push(label.description);
                return labels;
              }, labels) :
              []
          );
        }, []);
      }
    })
  }
}


