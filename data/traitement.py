import pandas as pd

# # Charger le fichier CSV dans un DataFrame
# df = pd.read_csv('accidents_corporels.csv', delimiter=';')

# # Sélectionner les lignes où l'une des colonnes de véhicule contient le mot "bicyclette"
# masque_bicyclette = (
#     (df['vehicule1'].str.lower() == 'bicyclette') |
#     (df['vehicule2'].str.lower() == 'bicyclette') |
#     (df['vehicule3'].str.lower() == 'bicyclette') |
#     (df['vehicule4'].str.lower() == 'bicyclette') |
#     (df['vehicule5'].str.lower() == 'bicyclette') |
#     (df['vehicule6'].str.lower() == 'bicyclette')
# )

# # Extraire les lignes correspondantes
# resultat = df[masque_bicyclette]

# # Afficher le résultat
# # print(resultat)

###################################################################

# for i in range(2019, 2023):

#     print(i)
#     # Liste des noms de fichiers CSV à fusionner
#     fichiers_csv = ['caracteristiques_' + str(i) + '.csv', 'lieux_' + str(i) + '.csv', 'usagers_' + str(i) + '.csv',
#                     'vehicules_' + str(i) + '.csv']

#     # Initialisez le DataFrame final avec le premier fichier CSV
#     df_final = pd.read_csv(fichiers_csv[0], delimiter=';', encoding='latin1')  # Utilisez 'latin1' comme encodage

#     # Fusionnez les autres fichiers CSV en utilisant la colonne d'identifiant
#     for fichier in fichiers_csv[1:]:
#         try:
#             df_temp = pd.read_csv(fichier, delimiter=';', encoding='latin1')  # Utilisez 'latin1' comme encodage
#             df_final = pd.merge(df_final, df_temp, on='Num_Acc', how='outer')
#         except pd.errors.ParserError as e:
#             print(f"Erreur lors de la lecture du fichier {fichier}: {e}")

#      # Supprimez les doublons basés sur la colonne 'Num_Acc'
#     df_final = df_final.drop_duplicates(subset='Num_Acc')

#     # Filtrer les lignes où la valeur de la colonne 'catv' est égale à 1
#     df_final_filtered = df_final[df_final['catv'] == 1]

#     # Sauvegardez le DataFrame final dans un nouveau fichier CSV
#     df_final_filtered.to_csv('fusion_resultat_' + str(i) + '.csv', index=False)




# for i in range(2005, 2019):
#     print(i)
    
#     fichiers_csv = ['caracteristiques_' + str(i) + '.csv', 'lieux_' + str(i) + '.csv', 'usagers_' + str(i) + '.csv',
#                     'vehicules_' + str(i) + '.csv']

#     # Initialisez le DataFrame final avec le premier fichier CSV
#     df_final = pd.read_csv(fichiers_csv[0], delimiter=',', encoding='latin1', dtype={'Num_Acc': str})

#     # Fusionnez les autres fichiers CSV en utilisant la colonne 'Num_Acc'
#     for fichier in fichiers_csv[1:]:
#         try:
#             df_temp = pd.read_csv(fichier, delimiter=',', encoding='latin1', dtype={'Num_Acc': str})
#             df_final = pd.merge(df_final, df_temp, on='Num_Acc', how='inner')
#         except pd.errors.ParserError as e:
#             print(f"Erreur lors de la lecture du fichier {fichier}: {e}")

#     # Supprimez les doublons basés sur la colonne 'Num_Acc'
#     df_final = df_final.drop_duplicates(subset='Num_Acc')

#     # Filtrer les lignes où la valeur de la colonne 'catv' est égale à 1
#     df_final_filtered = df_final[df_final['catv'] == 1]

#     # Sauvegardez le DataFrame final dans un nouveau fichier CSV
#     df_final_filtered.to_csv('fusion_resultat_' + str(i) + '.csv', index=False)




#df_final = pd.merge(df_final, df_temp, left_on='Num_Acc', right_on='Num_Acc', how='outer')


# def remove_last_comma(line):
#     comma_count = line.count(',')
#     if comma_count == 16:
#         last_comma_index = line.rfind(',')
#         line = line[:last_comma_index] + line[last_comma_index+1:]
#     return line

# for i in range(2009, 2010):
#     fichiers_csv = ['caracteristiques_' + str(i) + '.csv', 'lieux_' + str(i) + '.csv', 'usagers_' + str(i) + '.csv',
#                     'vehicules_' + str(i) + '.csv']

#     for fichier in fichiers_csv:
#         try:
#             # Lisez le fichier en tant que liste de lignes
#             with open(fichier, 'r', encoding='latin1') as file:
#                 lines = file.readlines()

#             # Appliquez la fonction remove_last_comma à chaque ligne
#             lines = [remove_last_comma(line) for line in lines]

#             # Écrivez les lignes modifiées dans le fichier
#             with open(fichier, 'w', encoding='latin1') as file:
#                 file.writelines(lines)

#             print(f"Traitement du fichier {fichier} terminé.")

#         except Exception as e:
#             print(f"Erreur lors du traitement du fichier {fichier}: {e}")

#     # Initialisez le DataFrame final avec le premier fichier CSV
#     df_final = pd.read_csv(fichiers_csv[0], delimiter=',', encoding='latin1', dtype={'Num_Acc': str})

#     # Fusionnez les autres fichiers CSV en utilisant la colonne 'Num_Acc'
#     for fichier in fichiers_csv[1:]:
#         try:
#             df_temp = pd.read_csv(fichier, delimiter=',', encoding='latin1', dtype={'Num_Acc': str})
#             df_final = pd.merge(df_final, df_temp, on='Num_Acc', how='outer')
#         except pd.errors.ParserError as e:
#             print(f"Erreur lors de la lecture du fichier {fichier}: {e}")

#     # Supprimez les lignes dupliquées basées sur la colonne 'Num_Acc'
#     df_final = df_final.drop_duplicates(subset='Num_Acc')

#     # Filtrer les lignes où la valeur de la colonne 'catv' est égale à 1
#     df_final_filtered = df_final[df_final['catv'] == 1]

#     # Sauvegardez le DataFrame final dans un nouveau fichier CSV
#     df_final_filtered.to_csv('fusion_resultat_' + str(i) + '.csv', index=False)


for i in range(2005, 2023):
    fichier_fusion = 'fusion_resultat_' + str(i) + '.csv'

    try:
        # Lisez le fichier fusionné en tant que DataFrame
        df = pd.read_csv(fichier_fusion, delimiter=',', encoding='latin1', dtype={'Num_Acc': str})

        # Supprimez les lignes où l'adresse n'est pas donnée et où lat et long valent 0
        #df = df.dropna(subset=['adr'])
        df = df[(df['lat'] != 0) & (df['long'] != 0) & (df['adr'] != '')]
        df = df[(df['lat'] != 0000000) & (df['long'] != 0000000) & (df['adr'] != '')]

        # Sauvegardez le DataFrame modifié dans le fichier fusionné
        df.to_csv(fichier_fusion, index=False, encoding='latin1')

        print(f"Traitement du fichier {fichier_fusion} terminé.")

    except Exception as e:
        print(f"Erreur lors du traitement du fichier {fichier_fusion}: {e}")