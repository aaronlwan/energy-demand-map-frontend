export async function GetMapHtml(lat, lon, r, city, state)  {
    const params = {
        'method': 'GET',
    }
    let response = await fetch('https://gosolar-backend.herokuapp.com/latlontomap?' + new URLSearchParams({
        "lat": lat,
        "lon": lon,
        "r": r,
        "city": city,
        "state": state
    }), params);
    const result = response.json();
    return result;
}