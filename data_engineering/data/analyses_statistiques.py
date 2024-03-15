import pandas as pd
import matplotlib.pyplot as plt
import math

# Remplacez ces valeurs par le chemin de votre fichier CSV et le nom de la colonne d'adresse
csv_file_path = 'accidents_velo_rennes.csv'

# Charger les données depuis le fichier CSV
df = pd.read_csv(csv_file_path)

## Histogramme des rues les plus accidentées

adresse_column_name = 'adresse'


# Fonction pour extraire le nom de la rue
def extract_street_name(address):
    #Supprimer le numéro de la rue et retourner le reste
    if pd.isnull(address):
        return address
    parts = address.split(', ')
    if len(parts) > 1:
        return parts[1]
    return address


# Appliquer la fonction à la colonne d'adresse
df[adresse_column_name] = df[adresse_column_name].apply(extract_street_name)

# Obtenir les 5 rues les plus fréquentes
top_5_streets = df[adresse_column_name].value_counts().nlargest(8)

# Créer un histogramme basé sur les 5 rues les plus fréquentes
# plt.figure(figsize=(10, 6))
# top_5_streets.plot(kind='bar', color='skyblue')
# plt.title('Histogramme des 8 Rues où il y a le plus d\'accidents de vélo')
# plt.xlabel('Rue')
# plt.ylabel('Fréquence')
# plt.xticks(rotation=45, ha='right')
# plt.tight_layout()

# Afficher l'histogramme
# plt.show()

## Répartition des accidents en fonction de l'heure de la journée

heure_column_name = 'heure'

# Convertir la colonne d'heure en objets datetime
df[heure_column_name] = pd.to_datetime(df[heure_column_name],
                                       format='%H:%M',
                                       errors='coerce')

# Extraire l'heure de la journée
df['heure_du_jour'] = df[heure_column_name].dt.hour

# Créer une courbe basée sur l'heure de la journée
# plt.figure(figsize=(10, 6))
# df['heure_du_jour'].value_counts().sort_index().plot(kind='line',
#                                                      marker='o',
#                                                      color='skyblue')
# plt.title('Répartition des Accidents en Fonction de l\'Heure de la Journée')
# plt.xlabel('Heure de la Journée')
# plt.ylabel('Nombre d\'Accidents')
# plt.xticks(range(24))
# plt.grid(True)
# plt.tight_layout()

# Afficher la courbe
# plt.show()

## Répartition des accidents en fonction du jour de la semaine

jour_semaine_column_name = 'jsem'

# Définir l'ordre des jours de la semaine
jours_de_la_semaine_order = [
    'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'
]

# Créer une courbe basée sur le jour de la semaine
plt.figure(figsize=(10, 6))
df[jour_semaine_column_name].value_counts(
).loc[jours_de_la_semaine_order].plot(kind='line', marker='o', color='skyblue')
plt.title('Répartition des Accidents en Fonction du Jour de la Semaine')
plt.xlabel('Jour de la Semaine')
plt.ylabel('Nombre d\'Accidents')
plt.xticks(rotation=45)
plt.grid(True)
plt.tight_layout()

# Afficher la courbe
plt.show()