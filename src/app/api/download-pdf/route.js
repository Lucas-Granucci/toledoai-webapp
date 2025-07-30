// ROUTE.JS
import { NextResponse } from 'next/server';
import { marked } from 'marked';

export async function POST(request) {
  let browser;

  try {
    const { text: fileText } = await request.json();

    if (!fileText) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    const html = convertMarkdownToHTML(fileText);

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': 'attachment; filename="document.html"',
      },
    });

  } catch (error) {
    console.error('Error generating HTML:', error);
    return NextResponse.json(
      { error: 'Failed to generate HTML', details: error.message },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

function convertMarkdownToHTML(markdownText) {
  const htmlContent = marked(markdownText);
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.6;
            color: #333;
            max-width: 210mm;
            margin: 0 auto;
            padding: 20px;
          }
          h1, h2, h3 { 
            color: #2c3e50; 
            margin-top: 20px;
            margin-bottom: 10px;
          }
          p { margin-bottom: 10px; }
          code { 
            background-color: #f4f4f4; 
            padding: 2px 4px; 
            border-radius: 3px;
          }
          pre { 
            background-color: #f4f4f4; 
            padding: 10px; 
            overflow-x: auto;
            border-radius: 5px;
          }
          ul, ol { margin-bottom: 15px; }
          li { margin-bottom: 5px; }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;
}
