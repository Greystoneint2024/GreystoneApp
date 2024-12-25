import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { CountryCode, Country } from './Types';

export default function App() {
    const [countryCode, setCountryCode] = useState<CountryCode>('FR');
    const [country, setCountry] = useState<Country | null>(null);
    const [withCountryNameButton, setWithCountryNameButton] = useState<boolean>(false);
    const [withFlag, setWithFlag] = useState<boolean>(true);
    const [withEmoji, setWithEmoji] = useState<boolean>(true);
    const [withFilter, setWithFilter] = useState<boolean>(true);
    const [withAlphaFilter, setWithAlphaFilter] = useState<boolean>(false);
    const [withCallingCode, setWithCallingCode] = useState<boolean>(false);

    const onSelect = (country: Country) => {
        setCountryCode(country.cca2);
        setCountry(country);
    };

    const Option = ({ title, value, onValueChange }: { title: string; value: boolean; onValueChange: (val: boolean) => void }) => (
        <View style={styles.optionContainer}>
            <Text>{title}</Text>
            <Switch value={value} onValueChange={onValueChange} />
        </View>
    );
    return (
        <View style={styles.container}>
            <Option title="With country name on button" value={withCountryNameButton} onValueChange={setWithCountryNameButton} />
            <Option title="With flag" value={withFlag} onValueChange={setWithFlag} />
            <Option title="With emoji" value={withEmoji} onValueChange={setWithEmoji} />
            <Option title="With filter" value={withFilter} onValueChange={setWithFilter} />
            <Option title="With calling code" value={withCallingCode} onValueChange={setWithCallingCode} />
            <Option title="With alpha filter code" value={withAlphaFilter} onValueChange={setWithAlphaFilter} />
            <CountryPicker
                countryCode={countryCode}
                withFilter={withFilter}
                withFlag={withFlag}
                withCountryNameButton={withCountryNameButton}
                withAlphaFilter={withAlphaFilter}
                withCallingCode={withCallingCode}
                withEmoji={withEmoji}
                onSelect={onSelect}
                visible
            />
            <Text style={styles.instructions}>Press on the flag to open modal</Text>
            {country !== null && (
                <Text style={styles.data}>{JSON.stringify(country, null, 2)}</Text>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        width: '80%',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    data: {
        marginTop: 20,
        color: '#000',
    },
});