import { Marked, Renderer } from "https://deno.land/x/markdown/mod.ts";

class MyRenderer extends Renderer
{
  // Overriding parent method.
  heading(text: string, level: number, raw: string)
  {
    const regexp = /\s*{([^}]+)}$/;
    const execArr = regexp.exec(text);
    let id: string;
    
    if(execArr)
    {
      text = text.replace(regexp, '');
      id = execArr[1];
    }
    else
    {
      id = text.toLocaleLowerCase().replace(/[^\wа-яіїє]+/gi, '-');
    }

    return `<h${level} id="${id}">${text}</h${level}>`;
  }
}

Marked.setOptions({renderer: new MyRenderer});
const aboutMePath = "https://raw.githubusercontent.com/GrzegorzDryja/grzegorzdryja.github.io/deno-markdown/data/about-me.md"
const decoder = new TextDecoder("utf-8");
const markdown = decoder.decode(await Deno.readFile(aboutMePath));
const aboutMeContent = Marked.parse(markdown);

console.log(aboutMeContent);
