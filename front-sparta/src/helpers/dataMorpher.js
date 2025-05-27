// morphs insights response into display-friendly format
// as the API return type was already specificed
// otherwise i would've just changed the API response type

export function formatInsights(insights) {
    return {
        totalVolumeByCommodity: formatCommodityVolume(insights.totalVolumeByCommodity),
        averagePriceByCommodity: formatAveragePriceByCommodity(insights.averagePriceByCommodity),
        topTradersByVolume: getTop3Traders(insights.topTradersByVolume)
    }
}

function formatCommodityVolume(totalVolumeByCommodity) {
    return Object.entries(totalVolumeByCommodity).map(([name, value]) => ({ name, value }));
}

function formatTraderVolume(topTradersByVolume) {
    return topTradersByVolume.map(({ traderId, volume }) => ({ name: traderId, value: volume }));
}

function formatAveragePriceByCommodity(averagePriceByCommodity) {
    return Object.entries(averagePriceByCommodity).map(([name, value]) => ({ name, value }));
}

 function getTop3Traders(topTradersByVolume) {
    return topTradersByVolume.slice(0, 3);
}