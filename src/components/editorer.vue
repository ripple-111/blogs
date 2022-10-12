<template>

    <div ref="editor" class="h-70vh">

    </div>

</template>

<script setup>
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
onMounted(()=>{
    editorer=monaco.editor.create(editor.value,{
    value:'',
    language:'markdown',
    theme:'vs-dark',
    padding:{
        top:'10px'
    }
    })
    editorer.onDidChangeModelContent(()=>emit('input',editorer.getValue()))
    editorer.onDidDispose(()=>comple.dispose())
    const comple=monaco.languages.registerCompletionItemProvider('markdown', {
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
        console.log(textBeforePointer)
        if(textBeforePointer=='#'){
            ['','#','##','###','####'].map(item=>suggestions.push({
                label:item+'#',
                kind:monaco.languages.CompletionItemKind['Function'],
                insertText:`${item} `+'${1:标题}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail:'插入标题',
            }))
        }
        else if(textBeforePointer.endsWith('*')){
            ['','*','**'].map(item=>suggestions.push({
                label:item+'*',
                kind:monaco.languages.CompletionItemKind['Function'],
                insertText:`${item}`+'${1:文字}'+`${item}*`,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail:'斜体/粗体',
            }))
        }
        else if(textBeforePointer=='1'){
            suggestions=[{
                label:'1.',
                kind:monaco.languages.CompletionItemKind['Function'],
                insertText:`1. \${1:列表项一}
2. \${2:列表项二}`,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail:'有序列表',
            }]
        }
        return {
            suggestions
        };
    },
    triggerCharacters: ["#","*","1"]
});
    
})
onBeforeUnmount(() => {
    editorer.dispose()
})


</script>
<style lang="scss" scoped>

</style>