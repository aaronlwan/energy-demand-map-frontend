export async function GetLatLon(city, state, country) {
    const params = {
        'method': 'GET',
    }
    let response = await fetch(`http://150.136.76.195:5000/citytolatlon?` + new URLSearchParams({
        "city": city,
        "stateCode": state,
        "country": country
    }), params);
    const result = response.json();
    return result;
}