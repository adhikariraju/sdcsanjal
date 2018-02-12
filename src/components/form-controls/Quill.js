import React from 'react';
import ReactQuill from 'react-quill'
import {teal400} from 'material-ui/styles/colors';
import "../../assets/quill.snow.css"

const modules={
            toolbar:{
                container:[   
                        [{ 'header': [1, 2, false] }],               
                        ['bold', 'italic', 'underline','strike', 'blockquote','code-block'],
                        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                        ['image','link']
                ],
                handlers: {
                 'image': imageHandler
        }               
            }
   
        }

const imageHandler = (image, callback) => {
    var maxWidth="100%"
    var maxHeight="100%"
    if(value) {
        this.quillRef.getEditor().insertEmbed(maxHeight,maxWidth);
    }
}

const formats=['header',
                'bold', 'italic', 'underline', 'strike', 'blockquote',
                'list', 'bullet', 'indent',
                'link','code-block','image'];

    const Quill=({
        input,
        label,
        meta:{touched,error},
        ...custom
    })=>{
        console.log("input",input)
        return <ReactQuill
        theme="snow"
        placeholder="Enter your Question"
         modules={modules}
        formats={formats}    
        style={{marginBottom:'10px'}}
        {...input}
        {...custom}
        onChange={(newValue, delta, source) => {
                   if (source === 'user') {
                   input.onChange(newValue);
                  }
                 }}
        onBlur={(range, source, quill) => {
            input.onBlur(quill.getHTML());
        }}
        >
        </ReactQuill>}
export default Quill;