<template>

  <div>
    <el-scrollbar height="75vh">
    <el-collapse accordion v-model="active" id="collapse">
      
        <el-collapse-item :title=item.title  v-for="(item,index) in styles" :name="index" :key="item">
            <el-form label-width="100px">
                <el-form-item v-for="(n,i) in item.form" :label="n.name" class="mt-1" :key="n">
                    <el-input v-model="n.value"  class="input" @change="change(n,item.ele,i,index)">
                        <template #prefix> 
                            <span class="text-slate-300">{{n.key+':'}}</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="自定义区" class="mt-1" v-if="item.text!=undefined">
                    <el-input type="textarea" v-model="item.text"  class="input"  :autosize="{ minRows: 4 }" @change="make(item)"></el-input>
                </el-form-item>
            </el-form>
        </el-collapse-item>
    </el-collapse>
    </el-scrollbar>
  </div>

</template>

<script setup>
const active=ref('')
const emit=defineEmits(['stylechange'])

let index=reactive([])
let formIndex=reactive([])
let stylesheet=Array.from(document.styleSheets).find(i=>i.cssRules[0]?.selectorText=='#edit')
console.log(stylesheet)
function change(n,ele,i,i2){
    try{
        let source=i2*styles.length+i
    if(formIndex[source]){
        stylesheet.deleteRule(formIndex[source])
        formIndex[source]=''
    }
    
    // let selectorText=selectorMap.find(item=>item[1]==ele)[0]
    // let length=Object.values(stylesheet.cssRules).findIndex(item=>item.selectorText==selectorText)
    if(n.value)
    formIndex[source]=stylesheet.insertRule(`${selectorMap.find(item=>item[1]==ele)[0]} {${n.key}:${n.value}}`,stylesheet.cssRules.length)
    }
    catch(err){
        ElMessage.error('样式格式出错了')
        console.log(err)
    }
}
function make({text}){
    let length=stylesheet.cssRules.length
    try{
        if(index.length)
        index.forEach((item,i)=>{ 
        if(item){
        stylesheet.deleteRule(item)
        }
        index=['']
    })
        if(text!=''){
        text.split('\n#').forEach((item,i)=>{
            if(i!=0)
            index.push(stylesheet.insertRule('#'+item,length))
            else
            index.push(stylesheet.insertRule(item,length))
        })
        
        }
    
    }
    catch(err){
        ElMessage.error('自定义样式格式有误')
        console.log(err)
    }
}
watch([index,formIndex],()=>{
    emit('stylechange',[index,formIndex]) 
})
const selectorMap=[]
onMounted(() => {
    // console.log(stylesheet.cssRules)
    Object.values(stylesheet.cssRules).forEach(item=>{
        let type=''
        
        switch(item.selectorText){
        case '#edit':
            type='edit'
            break;
        case '#edit h1, #edit h2, #edit h3, #edit h4, #edit h5':
            type='title'
            break;
        case '#edit h1':
            type='h1'
            break;
        case '#edit h2':
            type='h2'
            break;
        case '#edit strong':
            type='strong'
            break;
        case '#edit blockquote':
            type='blockquote'
            break;
        case '#edit ul, #edit ol':
            type='ulol'
            break;
        case '#edit ol':
            type='ol'
            break;
        case '#edit code':
            type='code'
            break;
        case '#edit pre:has(> code)':
            type='blockCode'
            break;
        case '#edit p:has(> code)':
            type='inlineCode'
            break;
        case '#edit hr':
            type='hr'
            break;
        case '#edit a':
            type='a'
            break;
        case '#edit em':
            type='a'
            break;
        }
        selectorMap.push([item.selectorText,type])
        let cssArray=item.cssText.substring(item.cssText.indexOf('{')+2,item.cssText.indexOf('}')-2).split('; ').map(item=>item.split(': '))
        let form=styles.find((item)=>item.ele==type)?.form
        if(form){
            form.forEach(item=>{
            let key=cssArray.find(n=>n[0]==item.key)
            if(key){
                item.value=key[1]
            }
        })
        
        }
        
    })
    // const css={edit:['color','fontSize','lineHeight','padding','letterSpacing','backgroundColor']}
    // const doms=['edit','title','h1','h2','strong','em','blockquate','ul,ol','code','pre:has(>code)','p:has(>code)','hr','a']
    // doms.forEach(dom=>{
    //     if(dom=='edit')
    //     dom='#edit'
    //     else if(dom=='title')
    //     dom='h1,h2,h3,h4,h5'
    //     let edit=document.querySelector(dom)
    //     console.log(edit)
    //     if(edit){
    //         console.log(window.getComputedStyle(edit))
    //         Object.keys(css).forEach((item)=>{
    //         let ele=document.getElementById(item)
    //         let style=window.getComputedStyle(ele)
    //         css[item].forEach((n)=>{
    //             console.log(style[n])
    //         }) 
    //         })
    //     }
    // })
    
    
})
const common=reactive([{
        name:'字体大小',
        key:'font-size',
        value:'',
    },{
        name:'字体颜色',
        key:'color',
        value:'',
    },{
        name:'字体粗细',
        key:'font-weight',
        value:'',
    },{
        name:'背景颜色',
        key:'background-color',
        value:''
    },{
        name:'内边距',
        key:'padding',
        value:''
    },
    {
        name:'外边距',
        key:'margin',
        value:''
    },{
        name:'行高',
        key:'line-height',
        value:''
    }])
const styles=reactive([{
    title:'全局样式',
    ele:'edit',
    text:'',
    form:[...JSON.parse(JSON.stringify(common)),{
        name:'字体',
        key:'font-family',
        value:''
    },{
        name:'文字间距',
        key:'letter-spacing',
        value:''
    }]
},{
    title:'全局标题',
    ele:'title',
    form:[...JSON.parse(JSON.stringify(common)),{
        name:'对齐方向',
        key:'text-align',
        value:''
    }]
},{
    title:'一级标题',
    ele:'h1',
    form:[...JSON.parse(JSON.stringify(common)),{
        name:'对齐方向',
        key:'text-align',
        value:''
    }]
},
{
    title:'二级标题',
    ele:'h2',
    form:[...JSON.parse(JSON.stringify(common)),{
        name:'对齐方向',
        key:'text-align',
        value:''
    }]
},{
    title:'强调',
    ele:'strong',
    form:JSON.parse(JSON.stringify(common))
},{
    title:'斜体',
    ele:'em',
    form:JSON.parse(JSON.stringify(common))
},{
    title:'引用',
    ele:'blockquote',
    form:[...JSON.parse(JSON.stringify(common)),{
    name:'边框宽度',
    key:'border-left-width',
    value:''
    },{
    name:'边框颜色',
    key:'border-color',
    value:''
    }]
},{
    title:'列表',
    ele:'ulol',
    form:[...JSON.parse(JSON.stringify(common)),{
    name:'列表图标',
    key:'list-style-type',
    value:''
    }]
},{
    title:'代码',
    ele:'code',
    form:[...JSON.parse(JSON.stringify(common))]
},{
    title:'代码块',
    ele:'blockCode',
    form:[...JSON.parse(JSON.stringify(common))]
},{
    title:'行内代码',
    ele:'inlineCode',
    form:[...JSON.parse(JSON.stringify(common))]
},{
    title:'分割线',
    ele:'hr',
    form:[{
        name:'颜色',
        key:'border-color',
        value:''
    },{
        name:'外边距',
        key:'margin',
        value:''
    }]
},{
    title:'超链接',
    ele:'a',
    form:[...JSON.parse(JSON.stringify(common)),{
        name:'下划线',
        key:'text-decoration-line',
        value:''
    }]
}])
</script>
<style lang="scss" scoped>
#collapse{
    --el-collapse-header-bg-color:rgba(32, 35, 36, 0.612);
    --el-collapse-header-text-color:white;
    --el-collapse-content-bg-color:rgb(30,30,30);
    --el-collapse-header-font-size:16px;
    border-top:none;
    :deep(.el-form-item__label){
        color:rgb(148, 163, 177)
    }
}
.input{
    width:90%;
    --el-input-bg-color:rgba(65, 68, 78, 0.633);
    --el-input-border-color:none;
    --el-input-focus-border-color:gray;
    --el-input-text-color:white;
}
:deep(.el-collapse-item__header){
    padding-left: 20px;
}
</style>