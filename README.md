# prf-project-shelved
## A projekt célja
Ez a projekt az SZTE Programrendszerek fejlesztése c. kurzusra készült. Ez egy olyan applikáció, ami 2 típusú felhasználót enged: admin (accessLevel: 3) és user (accessLevel: 1).

## Lokális indítás először
Külön kell indítani mind a kettőt
### Szerver
npm install
node index.js
3000-es porton indul

### Kliens
npm install
ng serve --proxy-config proxy.conf.json
4200-as porton indul

## A login képernyő

![image](https://user-images.githubusercontent.com/104270141/236694241-24da7ed1-299d-4850-8cfa-e2b360b13071.png)

A bejelentkezéshez egy felhasználónév-jelszó párost vár a felület, a bejelentkezés gombra kattintva a bejelentkezés végrehajtódik, a regisztráció gombra kattintva átjutunk a regisztráció oldalra.

## A regisztrációs képernyő

![image](https://user-images.githubusercontent.com/104270141/236694263-ca73c86a-6453-4a12-ae59-3a0b4f798051.png)

A regisztrációhoz szükséges mezőket kitöltve egy új usert szúrunk az adatbázisba, amibe utána be is léphetünk. A bejelentkezés gombra kattintva visszajutunk a bejelentkezési felületre.

## A könyvnézegető

![image](https://user-images.githubusercontent.com/104270141/236694288-f2b01dd9-53c7-4b4f-8296-89f33682967a.png)

Az adatbázisból kiolvasott könyv objektumok listája.

## Admin felület

![image](https://user-images.githubusercontent.com/104270141/236694316-73b702e5-a860-402f-b515-22c1000faaca.png)

AccessLevel: 3 kell a megtekintéséhez, authguard védi. Ebben lehet látni a felhasználók listáját, módosítani, illetve törölni is lehet felhasználókat.

## Ajánlott tesztelési folyamat

1. Regisztráció új felhasználóval a Regisztráció képernyőn
2. Bejelentkezés a regisztrált felhasználóval
3. Kijelentkezés
4. Bejelentkezés az admin felhasználóval:
username: fakeAdmin
password: pwadmin
5. Az adminfelületen törlés-frissítés-kiolvasás ellenőrzése
6. Kijelentkezés

## Egyéb
A szerver ExpressJS felhasználásával készült, a kliens pedig Angular. A forráskód néhol többet tartalmaz, mint ami használva van.



