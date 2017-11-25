import React from 'react'
import {RadioButtonGroup} from 'material-ui/RadioButton'

const RadioGroup=({input,...rest})=>
      <RadioButtonGroup 
       style={{display:"inline-block"}}
       {...input}
       {...rest}
       valueSelected={input.value}
       onChange={(event,value)=>input.onChange(value)}
        />
    
export default RadioGroup;