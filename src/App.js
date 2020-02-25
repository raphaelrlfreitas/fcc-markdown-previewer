import React from 'react';
import './App.scss';
import marked from 'marked'


marked.setOptions({
  breaks: true,
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}

const Editor = (props) => {
  return (
    <div>
      <textarea
        id="editor"
        value={props.markdown}
        onChange={props.handleChange}
        type="text"
      />

    </div>
  )
}


const Previewer = (props) => {
  return (
    <div id="preview" dangerouslySetInnerHTML={{ __html: marked(props.markdown, { renderer: renderer }) }} />
  )
}

const placeholder =
  `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

And here is some code blocks:
\`\`\`
Testing a code block
\`\`\`

> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

1. First item
2. Second item
3. Third item
    1. Indented item
    2. Indented item
4. Fourth item

My favorite search engine is [Duck Duck Go](https://duckduckgo.com).

Now an **IMAGE:**

![Test](https://d33wubrfki0l68.cloudfront.net/e7ed9fe4bafe46e275c807d63591f85f9ab246ba/e2d28/assets/images/tux.png)

`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      markdown: placeholder,
    }
  }

  handleChange(e) {
    this.setState({
      markdown: e.target.value
    });
  }



  render() {

    return (

      <div className="App">
        <header className="header">
          <h1>My Markdown Previewer</h1>
        </header>
        <div className="container">
          <div className="editor-container">
            <Editor
              markdown={this.state.markdown}
              handleChange={this.handleChange}
            />
          </div>
          <Previewer
            markdown={this.state.markdown}
          />
        </div>

      </div>
    );
  };
}

export default App;
