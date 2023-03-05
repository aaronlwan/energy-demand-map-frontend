export async function GetLatLon(city, state, country) {
    const params = {
        'method': 'GET',
    }
    let response = await fetch(`https://gosolar-backend.herokuapp.com/citytolatlon?` + new URLSearchParams({
        "city": city,
        "stateCode": state,
        "country": country
    }), params);
    const result = response.json();
    return result;
}