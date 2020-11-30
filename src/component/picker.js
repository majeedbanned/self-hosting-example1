import React from 'react'
import { Button } from 'react-native-elements'
import {Picker} from 'react-native';
export const AppPickerInput = ({ formikProps, formikKey, labelText, options=[] , ...rest}) => {
    return (
        <FieldWrapper
            formikKey={formikKey}
            labelText={labelText}
            formikProps={formikProps}>
            <View style={styles.PickerContainerStyle}>
                <Picker
                    itemStyle={{ color: 'red' }}
                    selectedValue={  value => {
                        formikProps.setFieldValue(formikKey, value)
                    } }
                    onValueChange={ value => {
                        formikProps.setFieldValue(formikKey, value)
                    }}
                    
                    {...rest}
                    >
                    {
                       options.map( item => (
                            <Picker.Item label={item.label} value={item.value} />
                       ))
                    }
                </Picker>
            </View>
        </FieldWrapper>
    );
}

export default picker