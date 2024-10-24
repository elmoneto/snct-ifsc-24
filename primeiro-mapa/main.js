var map = L.map('mapa').setView([-28.099123, -48.675219], 18); // coordenadas iniciais centradas no IFSC

// layer base do OpenStreetMap (poderia ser imagem do satélite do Bing, por exemplo)
const baseLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        minZoom: 15,
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
);

baseLayer.addTo(map);

let caminhoArquivo = `data/calourada.geojson`;

//Bibliotecas como OpenLayers tem carregamento simplificado de arquivo GeoJSON
var teste = fetch(caminhoArquivo)
    .then(res => {
        data = res.json();
        return data;
    }).then(data => {
        camada = L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                if (feature.properties.nome != null) {
                    var popup = '<h3>' + feature.properties.nome + '</h3>' + feature.properties.descricao + '</p>';
                    layer.bindPopup(popup);
                }
            },
        });

map.addLayer(camada);
});