# Widget YouTube Music (Windows)

Petite fenêtre toujours au premier plan avec YouTube Music. Les touches média du clavier fonctionnent. La connexion Google est conservée.

- Lancer : `npm install && npm start`, ou double-clic sur `lancer.bat` une fois installé.
- Fabriquer un `.exe` portable (à lancer sous Windows, après `npm install`) : `npm run build` → `dist/Widget YouTube Music *.exe`. Réutilise l’Electron déjà installé dans `node_modules`.
- Fermer la fenêtre la réduit dans la zone de notification (la musique continue). Clic sur l’icône : afficher/masquer ; clic droit : menu (lecture/pause, précédent, suivant, premier plan, quitter).
