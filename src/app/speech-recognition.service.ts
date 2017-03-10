import { Injectable, OpaqueToken } from '@angular/core';

export interface SpeechRecognitionConstructor {
  new (): ISpeechRecogonition;
}

export interface ISpeechRecogonition {
  onresult: (event: Event) => void;
  start(): void;
  abort(): void;
}

declare global {
  interface Window {
    webkitSpeechRecognition: SpeechRecognitionConstructor;
    mozSpeechRecognition: SpeechRecognitionConstructor;
    msSpeechRecognition: SpeechRecognitionConstructor;
    SpeechRecognition: SpeechRecognitionConstructor;
  }
}

export const SpeechRecognition: SpeechRecognitionConstructor =  (
  window && (
    window.SpeechRecognition || window.webkitSpeechRecognition || 
    window.mozSpeechRecognition || window.msSpeechRecognition
  )
) || null;

export const SpeechRecognitionToken = new OpaqueToken('SpeechRecognition');