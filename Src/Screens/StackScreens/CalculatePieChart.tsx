import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

const CalculatePieChart = ({ mortgageData }: any) => {
    if (!mortgageData || !mortgageData.pieChart) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Data not available</Text>
            </View>
        );
    }

    const { homeInsurancePercentage, otherCostPercentage, principalInterestPercentage, propertyTaxPercentage } = mortgageData.pieChart;

    const pieData = [
        { value: parseFloat(principalInterestPercentage), color: '#101828', label: 'Principal & Interest' },
        { value: parseFloat(propertyTaxPercentage), color: '#FA6A6A', label: 'Property Taxes' },
        { value: parseFloat(homeInsurancePercentage), color: '#79C7FF', label: 'Home Insurance' },
        { value: parseFloat(otherCostPercentage), color: '#3D7200', label: 'Other Cost' },
    ];

    const totalValue = pieData.reduce((sum, item) => sum + item.value, 0);

    const pieDataWithPercentage = pieData.map(item => ({
        ...item,
        text: `${((item.value / totalValue) * 100).toFixed(0)}%`,
    }));

    return (
        <View style={styles.container}>
            <View style={styles.pieContainer}>
                <PieChart
                    data={pieDataWithPercentage}
                    donut={true}
                    innerRadius={30}
                    radius={75}
                    showText={true}
                    textColor="white"
                    textSize={12}
                    //@ts-ignore
                    textStyle={{ fontWeight: '300' }}
                    //@ts-ignore
                    textField={(item) => item.text}
                    centerLabelComponent={() => <Text style={styles.centerText}>Costs</Text>}
                />
            </View>

            <View style={styles.legendContainer}>
                {pieDataWithPercentage.map((item, index) => (
                    <View key={index} style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                        <Text style={styles.legendText}>{item.label}={item.text}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    pieContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    legendContainer: {
        marginLeft: 20,
        justifyContent: 'center',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    legendColor: {
        width: 20,
        height: 20,
        borderRadius: 5,
        marginRight: 10,
    },
    legendText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#464141'
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});

export default CalculatePieChart;
