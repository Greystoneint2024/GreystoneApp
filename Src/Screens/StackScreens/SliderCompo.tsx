import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const SliderCompo = () => {
    const [range, setRange] = useState([0, 1000]);

    const onValuesChange = (values: React.SetStateAction<number[]>) => {
        setRange(values);
    };

    const formatPrice = (value: number) => {
        if (value === 1000) {
            return '1000k';
        } else {
            return `${value}k`;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>€{formatPrice(range[0])} - €{formatPrice(range[1])}</Text>
            <MultiSlider
                values={range}
                sliderLength={320}
                onValuesChange={onValuesChange}
                min={0}
                max={1000}
                step={1}
                selectedStyle={{ backgroundColor: '#101828' }}
                unselectedStyle={{ backgroundColor: '#eaecf0' }}
                markerStyle={{
                    height: 20,
                    width: 20,
                    backgroundColor: '#101828',
                }}
                trackStyle={{
                    height: 5,
                    borderRadius: 5,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        color: '#101828',
    },
});

export default SliderCompo;

