<template>

    <div ref="editor" class="h-70vh">

    </div>

</template>

<script setup>
import loader from "@monaco-editor/loader"
import * as monaco from 'monaco-editor'
const editor=ref(null)
let editorer=null
const emit = defineEmits(['input'])
const prop=defineProps({markdown:String})
loader.config({ monaco });
loader.config({
  "vs/nls": {
    availableLanguages: { "*": "zh-cn" },
  },
});


onMounted(()=>{
   
    loader.init().then(monacoInstance => {
    editorer=monacoInstance.editor.create(editor.value,{
    language:'markdown',
    theme:'vs-dark',
    autoClosingBrackets: false,
    minimap: { // 关闭小地图
      enabled: false,
    },
    wordWrap:'on',
    unicodeHighlight:{ ambiguousCharacters:false},
    padding:{
        top:'10px'
    }
    })
    watchEffect(()=>editorer.setValue(prop.markdown))
    window.addEventListener('resize',()=>{
    editorer.layout()
    })
    emit('input',editorer.getValue()) //初始化一次markdown
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
        else if(textBeforePointer=='|'){
            suggestions.push({
                label:'表格',
                kind:monaco.languages.CompletionItemKind['Function'],
                insertText:` \${1:表头}|\${2:表头}|\${3:表头}|
|:---   |:----: |---:   |
|\${4:内容}    |\${5:内容}    |\${6:内容}    |
|Paragraph|Text|And more|`,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail:'创建表格',
            })
        }
        if(textBeforePointer=='___'||textBeforePointer=='*'||textBeforePointer=='-'){
            suggestions.push({
                label:'分割线',
                kind:monaco.languages.CompletionItemKind['Function'],
                insertText:'---',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            })
        }
        if(textBeforePointer=='+'||textBeforePointer=='-'||textBeforePointer=='*'){
            suggestions.push({
                label:'ol无序列表',
                kind:monaco.languages.CompletionItemKind['Function'],
                insertText:` \${1:列表项一}
${textBeforePointer} \${2:列表项二}`,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail:'有序列表',
            }) 
        }
        if(textBeforePointer=='-'){
            suggestions.push({
                label:'代办事项',
                kind:monaco.languages.CompletionItemKind['Function'],
                insertText:` [x] Write the press release
- [ ] Update the website
- [ ] Contact the media`,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail:'代办事项',
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
        if(textBeforePointer.endsWith(':')){
            suggestions.push({
                label:'👍',
                kind:monaco.languages.CompletionItemKind['Function'],
                insertText:'+1:',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            })
            
        }
        
        return {
            suggestions
        };
    },
    triggerCharacters: ["#","*","1","+","-",'`','[','!','|',':']
    })
    // editorer.addAction({
    //     id:'emoji',
    //     label:'emoji表情',
    //     keybindings:[monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyE],
    //     run:(edit)=>{
    //         editorer.trigger('开启表情选择', 'editor.action.triggerSuggest', {});
    //     }
    // })
});
    
})
onBeforeUnmount(() => {
    editorer.dispose()
})


</script>
<style lang="scss" scoped>

</style>