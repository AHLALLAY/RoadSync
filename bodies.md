1. User (Utilisateur)
Route probable : POST /api/auth/register ou /api/users

Attention : Le champ role doit être soit "Admin" soit "Chauffeur".

```JSON
{
  "firstName": "Ahmed",
  "lastName": "Ben Ali",
  "email": "ahmed.driver@transport.com",
  "password": "MonSuperMotDePasse123!",
  "birthDay": "1990-05-15",
  "cin": "JB123456",
  "phone": "0661234567",
  "role": "Chauffeur"
}
```
2. Truck (Camion)
Route probable : POST /api/trucks

Attention :

status et fuelType sont en Français dans ton modèle.

registrationNumber doit être unique.

```JSON
{
  "registrationNumber": "12345-A-67",
  "make": "Volvo",
  "model": "FH16",
  "year": 2022,
  "status": "Disponible", 
  "mileage": 120500,
  "tankCapacity": 900,
  "fuelType": "Diesel"
}
```
3. Trailer (Remorque)
Route probable : POST /api/trailers

Attention :

type utilise des termes spécifiques en français (Plateau, Frigo, Citerne, etc.).

payload est en tonnes (numérique).

```JSON
{
  "registrationNumber": "R-9988-B",
  "type": "Frigo",
  "payload": 25,
  "model": "Schmitz Cargobull",
  "year": 2021,
  "status": "Disponible"
}
```
4. Trip (Mission / Trajet)
Route probable : POST /api/trips

C'est le plus complexe car il contient des relations (ObjectId). Important : Pour que ce test fonctionne, tu dois remplacer les valeurs de driver, truck et trailer par de vrais IDs existants dans ta base de données MongoDB (tu peux les récupérer après avoir créé les éléments précédents).

Attention : status est en Anglais ici ('Planned', 'InProgress'...) contrairement aux camions.

Cas A : Création d'un voyage (Planifié)
C'est le JSON minimal pour créer la mission.

```JSON
{
  "departureCity": "Casablanca",
  "arrivalCity": "Tanger",
  "startDate": "2023-12-20T08:00:00.000Z",
  "driver": "6571b6d58431e6c3d9a5e001", 
  "truck": "6571b6d58431e6c3d9a5e002",
  "trailer": "6571b6d58431e6c3d9a5e003",
  "status": "Planned",
  "startKm": 120500
}
```
Cas B : Mise à jour (Fin de voyage)
Si tu testes une route PUT /api/trips/:id pour finir le voyage, tu enverras probablement ceci :

```JSON
{
  "status": "Completed",
  "endDate": "2023-12-20T18:30:00.000Z",
  "endKm": 120850,
  "fuelRefillLitres": 50,
  "receiptImage": "url_vers_image_recu.jpg"
}
```