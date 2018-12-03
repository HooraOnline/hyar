import { StyleSheet } from 'react-native';
import vars, { styleVariables } from './vars';

export const publicStyle = {
    checkBox:{width:30,height:30,borderColor:'#e1e1e1',borderRadius:6},
    checkBoxColored:{width:30,height:30,borderRadius:6},
    mainContainer: {
      
        backgroundColor: vars.cointainerBackgroundColor,
       
    },
    header: {
        backgroundColor: '#48d1cc', 
    },
    footer:{
        backgroundColor:'#fff' 
    },
    footerHarmony:{
        backgroundColor:'blue' 
    },
    textheader: {
        fontSize: 16,
        fontFamily:'iran_sans_bold',
        textAlign: 'center',
       
        color: '#fff'
    },
    boldText: {
        fontSize: 14,
        fontFamily:'iran_sans_bold',
    },
    logo: {
        width:150,height:150,alignSelf: "center",margin:10
    },
    content:{
        justifyContent: 'center', alignItems: 'center', margin: 7
    },
    normalTextGray:{
        fontSize: 16,
        fontFamily:'iran_sans',
        color:'#616A6B'
    },
    padingText:{
        fontSize: 16,
        fontFamily:'iran_sans',
        color:'#616A6B',
        padding:10,
    },
    underline: {
        flex: 1,
        borderBottomColor: 'white',
        borderBottomWidth: 0.3,
        paddingBottom: 10
    },
    input:{
     color:'#616A6B',
    },
    absoluteView: {

        width: '100%',
        height: '100%'
    },
    button: {

        alignSelf: "center",  justifyContent: "center", height: 40, borderRadius:6,backgroundColor:'red'
        
    },
    btnText: {

        fontFamily:'iran_sans_bold', fontSize: 14,
        
    },
    normalText: {

       fontFamily:'iran_sans_bold', fontSize: 14,
        
    },
    filterBox: {
        header:{ backgroundColor:'red'},
        footer:{ backgroundColor:'#187DDC'},
    },
   
    
};
export const listFormStyle = {
    selected:{backgroundColor:styleVariables.listSelected},
  
}

export const CenterElement = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: vars.textColor
    }
});


