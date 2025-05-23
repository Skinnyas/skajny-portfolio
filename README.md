# Skajny Portfolio

Moderní a responzivní portfolio web vytvořený pomocí React a Material-UI s Python (Flask) backendem.

![Screenshot portfolia](public/preview.png)

## Funkce

- Moderní a responzivní design
- Rychlé načítání a plynulé animace
- Optimalizováno pro vyhledávače (SEO)
- Kompatibilní s mobilními zařízeními
- Jednoduchá správa obsahu
- Kontaktní formulář

## Technologie

- **Frontend:**
  - React.js
  - React Router pro navigaci
  - Material-UI pro UI komponenty
  - CSS3 pro vlastní styly
  - Responzivní design

- **Backend (volitelný):**
  - Python s Flask frameworkem
  - RESTful API

## Požadavky

- Node.js (v14 nebo novější)
- npm (v6 nebo novější) nebo yarn
- Python 3.8+ (pouze pro backend)

## Instalace

1. Naklonujte repozitář:
   ```bash
   git clone https://github.com/vasenicko/skajny-portfolio.git
   cd skajny-portfolio
   ```

2. Nainstalujte závislosti frontendu:
   ```bash
   npm install
   # nebo
   yarn install
   ```

3. (Volitelné) Nastavení backendu:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Na Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

## Spuštění vývoje

### Frontend

```bash
# Spustit vývojový server
npm start
# nebo
yarn start
```

Otevřete [http://localhost:3000](http://localhost:3000) v prohlížeči.

### Backend (volitelný)

```bash
cd backend
python app.py
```

Backend poběží na [http://localhost:5000](http://localhost:5000)

## Sestavení pro produkci

```bash
# Vytvoří optimalizovanou produkční verzi
npm run build
# nebo
yarn build
```

Výsledné soubory budou ve složce `build`.

## Přizpůsobení

1. **Změna barev a motivu**: Upravte `theme` objekt v `src/index.js`
2. **Aktualizace obsahu**: Upravte příslušné komponenty v `src/components`
3. **Přidání projektů**: Upravte pole `portfolioItems` v `src/components/Portfolio/Portfolio.js`
4. **Aktualizace kontaktních informací**: Upravte `src/components/Contact/Contact.js`

## Nasazení

### Frontend

Můžete nasadit na libovolnou statickou hostingovou službu jako:
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)

### Backend

Doporučené možnosti nasazení:
- [Heroku](https://www.heroku.com/)
- [PythonAnywhere](https://www.pythonanywhere.com/)
- [DigitalOcean](https://www.digitalocean.com/)

## Licence

Tento projekt je licencován pod MIT licencí - viz soubor [LICENSE](LICENSE) pro detaily.

## Poděkování

- [Create React App](https://create-react-app.dev/)
- [Material-UI](https://mui.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- Komunitě React a open-source vývojářům
#   s k a j n y - p o r t f o l i o  
 #   s k a j n y - p o r t f o l i o  
 # skajny-portfolio
