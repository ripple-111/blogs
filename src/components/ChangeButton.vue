<template>
    <el-button text @click="open" class="underline " type="primary">{{ text }}</el-button>
</template>

<script setup>
import { ElInput } from 'element-plus';
const {text,place,confirmText,cancelText,pattern,length,type}=defineProps({
    text:{type:String,required:true},
    place:{type:String,required:true},
    confirmText:{type:String,default:'确认'},
    cancelText:{type:String,default:'取消'},
    pattern:Function,
    length:Array,
    type:String,
})
const emit = defineEmits(['confirm'])
const defaulePattern=(value)=>{
    if(type=='password'){
    if(state.pas1!=state.pas2||!state.pas1.length||!state.pas2.length)
    return '两次密码不一致'
    if((state.pas1.length<length[0]||state.pas1.length>length[1])||(state.pas2.length<length[0]||state.pas2.length>length[1]))
    return `新密码长度不在${length[0]}和${length[1]}之间`
    }
    if(!value)
    return '不能为空'
    if(length){
    if(value.length>=length[0]&&value.length<=length[1])
    return true
    else
    return `输入的长度不在${length[0]}和${length[1]}之间`
    }
}
const state=reactive({
    textarea:'',
    pas1:'',
    pas2:'',
})

const open=()=>{
    ElMessageBox.prompt(
        ()=>h('div',[
            h('p',`请输入您的新${place}`),
            type=='introduce'?h(ElInput,{ 
            modelValue: state.textarea,
            'onUpdate:modelValue': (value) =>state.textarea= value,
            autosize:true,
            type:'textarea',
            placeholder:`请输入您的新${place}`,
            showWordLimit:true,
            maxlength:"100",
            autofocus:true,
            class:'mt-4'}):null,
            type=='password'?h(ElInput,{ 
            modelValue: state.pas1,
            'onUpdate:modelValue': (value) =>state.pas1= value,
            showPassword:true,
            type:'password',
            showWordLimit:true,
            placeholder:`请输入您的新${place}`,
            minLength:length[0],
            maxlength:length[1],
            class:'mt-4'}):null,
            type=='password'?h(ElInput,{ 
            modelValue: state.pas2,
            'onUpdate:modelValue': (value) =>state.pas2= value,
            showPassword:true,
            minLength:length[0],
            maxlength:length[1],
            type:'password',
            showWordLimit:true,
            placeholder:`请确认您的新${place}`,
            class:'mt-4'}):null,
        ])       
        ,
        text,
        {   
            inputPlaceholder:`请输入您的${place}`,
            showInput:type=='introduce'?false:true,
            confirmButtonText: confirmText,
            cancelButtonText: cancelText,
            inputValidator:type=='introduce'?'':pattern||defaulePattern,
            appendTo:document.documentElement,
            beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
                instance.confirmButtonLoading = true
                instance.confirmButtonText = 'Loading...'
                emit('confirm',type,instance.inputValue||state.textarea,state.pas1)
                setTimeout(() => {
                done()
                setTimeout(() => {
                    instance.confirmButtonLoading = false
                }, 300)
                }, 1000)
            } else {
                done()
            }
            },
        }
    )
}
</script>
