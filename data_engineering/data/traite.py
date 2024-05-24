import pandas as pd
import sqlite3

# Charger le fichier CSV dans un DataFrame
df = pd.read_csv('accidents_corporels.csv', delimiter=';')

# Sélectionner les lignes o l'une des colonnes de véhicule contient le mot "bicyclette"
masque_bicyclette = ((df['vehicule1'].str.lower() == 'bicyclette') |
                     (df['vehicule2'].str.lower() == 'bicyclette') |
                     (df['vehicule3'].str.lower() == 'bicyclette') |
                     (df['vehicule4'].str.lower() == 'bicyclette') |
                     (df['vehicule5'].str.lower() == 'bicyclette') |
                     (df['vehicule6'].str.lower() == 'bicyclette'))

# Extraire les lignes correspondantes
resultat = df[masque_bicyclette]

# Réinitialiser l'index pour créer une nouvelle colonne "id" incrémentale
resultat.reset_index(drop=True, inplace=True)
resultat[
    'id'] = resultat.index + 1  # Créer une colonne "id" en incrémentant de 1

resultat.to_csv('accidents_velo_rennes.csv', index=False)

# Afficher le résultat
# print(resultat)

###################################################################

# for i in range(2005,2023):

#     # Liste des noms de fichiers CSV à fusionner
#     fichiers_csv = [ i + '/carcteristiques-' + i + '.csv', i + '/lieux-' + i + '.csv', i + '/usagers-' + i + '.csv', i + '/vehicules-' + i + '.csv']

#     # Initialisez le DataFrame final avec le premier fichier CSV
#     df_final = pd.read_csv(fichiers_csv[0],delimiter=';')

#     # Fusionnez les autres fichiers CSV en utilisant la colonne d'identifiant
#     for fichier in fichiers_csv[1:]:
#         try:
#             df_temp = pd.read_csv(fichier,delimiter=';')
#             df_final = pd.merge(df_final, df_temp, on='Num_Acc', how='outer')
#         except pd.errors.ParserError as e:
#             print(f"Erreur lors de la lecture du fichier {fichier}: {e}")

#     # Filtrer les lignes où la valeur de la colonne 'catv' est égale à '01'
#     df_final_filtered = df_final[df_final['catv'] == 1]

#     # Sauvegardez le DataFrame final dans un nouveau fichier CSV
#     df_final_filtered.to_csv('fusion_resultat_ ' + i + '.csv', index=False)
