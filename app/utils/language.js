//import { I18nManager } from 'react-native';

export const dic={};
let cUser={};
cUser.lang='fa';//I18nManager.localeIdentifier.split('_')[0];
console.log(cUser.lang)
let lang=cUser.lang;
dic.fa={};
dic.en={};
dic.fa['hamrhayar_1397']='هم راه 1397'; dic.en['hamrhayar_1397']='HamrahYar 2018'
dic.fa['Mobile_number_not_arrived']='شماره موبایل وارد نشده'; dic.en['Mobile_number_not_arrived']='Mobile number not arrived';
dic.fa['enter_your_mobile']='شماره موبایل خود را وارد کنید.';dic.en['enter_your_mobile']='Enter your mobile.';
dic.fa['register_before']='قبلا ثبت نام کرده ام.';dic.en['register_before']='I have already registered.';
dic.fa['enter_mobile_number']='ورود شماره موبایل';dic.en['enter_mobile_number']='Enter mobile number';
dic.fa['sms_recived_code']='ورود کد';dic.en['sms_recived_code']='Enter code';
dic.fa['enter_sms_recived_password']='کد 5 رقمی پیامک شده را در باکس بالا وارد کنید.';dic.en['enter_sms_recived_password']='Enter the 5-digit SMS code in the above text box .';
dic.fa['main_page_title']='فرم اصلی اپلیکیشن';dic.en['main_page_title']='HamrahYar';
dic.fa['UserManagmentFormTitle']='مدیریت کاربران';dic.en['User Managment']='';


export const $lng = dic[lang]




