"use client";
import React from "react";

// 参考: https://note.com/no6yy/n/n29b7dbdee7c2
export default function Home() {

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return;
      }
      downloadFile(fixCueSheet(reader.result));
    };
    reader.readAsText(file);
  };

  const fixCueSheet = (cueSheet: string): string => {
    return cueSheet.replaceAll('FILE', '----')
      .replace('----', 'FILE')
      .replaceAll((/INDEX (\d+) \d{2}:(\d{2}:\d{2})/g), (substring: string, index, time) => {
        console.log('substring:', substring, 'args:', index, time);
        return `INDEX ${index} ${time}:00`
      });
  }

  const downloadFile = (content: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "cuesheet.cue";
    document.body.appendChild(element);
    element.click();
  }

  return (
    <main className="w-screen h-screen p-4">
      <h1 className="font-bold text-3xl">CUEシートfixer</h1>
      <p>rekordboxが吐き出したCUEシートを、Mixcloudが読み込める形に修正します。</p>
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-row items-center">
          <label htmlFor="file">cueシート</label>
        <input
          type="file"
          accept=".cue"
          onChange={(e) => {
            const file = e.target.files?.item(0);
            if (!file) { return } 
            readFile(file)
          }}
        />
        </div>
      </div>
    </main>
  );
}

