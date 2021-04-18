export class GitHubRepo {
  name: string;
  htmlUrl: string;
  language: string;
  description: string;

  constructor(
    { name, htmlUrl, language, description }:
    { name: string, htmlUrl: string, language: string, description: string }
  ){
    this.name = name;
    this.htmlUrl = htmlUrl;
    this.language = language;
    this.description = description;
  }
  
  toString() {
    return `${this.name} ${this.htmlUrl} ${this.language} ${this.description}`;
  }
}
  