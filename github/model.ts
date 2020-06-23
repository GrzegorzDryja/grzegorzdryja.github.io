export class GitHubRepo {
  name: string;
  html_url: string;
  language: string;
  description: string;

  constructor(
    { name, html_url, language, description }:
    { name: string, html_url: string, language: string, description: string }
  ){
    this.name = name;
    this.html_url = html_url;
    this.language = language;
    this.description = description;
  }
  
  toString() {
    return `${this.name} ${this.html_url} ${this.language} ${this.description}`;
  }
}
  