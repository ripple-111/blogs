<template>

    <div ref="editor" class="h-70vh">

    </div>

</template>

<script setup>
import loader from "@monaco-editor/loader"
import * as monaco from 'monaco-editor'
const editor=ref(null)
let editorer=null
// const suggestions=[{
//     label:'h1/标题一',
//     kind:monaco.languages.CompletionItemKind['Function'],
//     insertText:'# ${1:标题}',
//     insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//     detail:'插入大标题',
// }]
const emit = defineEmits(['input'])
loader.config({ monaco });
loader.config({
  "vs/nls": {
    // availableLanguages: { "*": "de" },
    availableLanguages: { "*": "zh-cn" },
  },
});


onMounted(()=>{
    loader.init().then(monacoInstance => {
    editorer=monacoInstance.editor.create(editor.value,{
    value:'',
    language:'markdown',
    theme:'vs-dark',
    autoClosingBrackets: false,
    padding:{
        top:'10px'
    }
    })
    editorer.onDidChangeModelContent(()=>emit('input',editorer.getValue()))
    editorer.onDidDispose(()=>comple.dispose())
    const comple=monacoInstance.languages.registerCompletionItemProvider('markdown', {
    provideCompletionItems:(model, position,context,token)=>{
        const { lineNumber, column } = position
      // 光标前文本
        let suggestions=[]
        const textBeforePointer = model.getValueInRange({
        startLineNumber: lineNumber,
        startColumn: 0,
        endLineNumber: lineNumber,
        endColumn: column
        })
        if(textBeforePointer=='#'){
            ['','#','##','###','####'].map(item=>suggestions.push({
                label:item+'#',
                kind:monaco.languages.CompletionItemKind['Function'],
                insertText:`${item} `+'${1:标题}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail:'插入标题',
            }))
        }
        else if(textBeforePointer=='!')
            suggestions.push({
                label:'插入图片',
                kind:monaco.languages.CompletionItemKind['Function'],
                insertText:'[名称](地址)',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        })
        else if(textBeforePointer=='___'||textBeforePointer=='*'||textBeforePointer=='-'){
            suggestions.push({
                label:'分割线',
                kind:monaco.languages.CompletionItemKind['Function'],
                insertText:'---',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            })
        }
        else if(textBeforePointer=='1'){
            suggestions.push({
                label:'1.',
                kind:monaco.languages.CompletionItemKind['Function'],
                insertText:`1. \${1:列表项一}
2. \${2:列表项二}`,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail:'有序列表',
            })
        }
        else if(textBeforePointer=='+'||textBeforePointer=='-'||textBeforePointer=='*'){
            suggestions.push({
                label:'ol无序列表',
                kind:monaco.languages.CompletionItemKind['Function'],
                insertText:` \${1:列表项一}
${textBeforePointer} \${2:列表项二}`,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail:'有序列表',
            })
        }
        if(textBeforePointer.endsWith('*')){
            ['','*','**'].map(item=>suggestions.push({
                label:item+'*',
                kind:monaco.languages.CompletionItemKind['Function'],
                insertText:`${item}`+'${1:文字}'+`${item}*`,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail:'斜体/粗体',
            }) 
            )
           
        }
        if(textBeforePointer.endsWith('`')){
            suggestions=suggestions.concat([{
                label:'行内代码',
                kind:monaco.languages.CompletionItemKind['Function'],
                insertText:'${1:var x}`',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail:'插入一个行内代码块',
            },{
                label:'代码块',
                kind:monaco.languages.CompletionItemKind['Function'],
                insertText:'``'+`
console.log(\${1:x})
`+'```',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail:'插入一个多行代码块',
            }])
        } 
        if(textBeforePointer.endsWith('[')){
            suggestions.push({
                label:'外部链接',
                kind:monaco.languages.CompletionItemKind['Function'],
                insertText:'名称](地址)',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            })
        }
        return {
            suggestions
        };
    },
    triggerCharacters: ["#","*","1","+","-",'`','[','!']
    })
    
});
    
})
onBeforeUnmount(() => {
    editorer.dispose()
})


</script>
<style lang="scss" scoped>

</style>