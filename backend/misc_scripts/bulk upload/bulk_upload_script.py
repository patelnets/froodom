import pandas as pd
import json

df = pd.read_csv("Food Database.csv")

print(df.head())

# convert the dataframe to a list of dictionaries of format name: str, stores: list[str]
# convert columns names first

STORE_NAME_MAPPING = {
    "Tesco": "tesco",
    "Asda": "asda",
    "Sainsburys": "sainsburys",
    "Morrisons": "morrisons",
    "Waitrose": "waitrose",
    "M&S": "mands",
    "Aldi": "aldi",
    "Lidl": "lidl",
    "H&B": "hollandAndBarrett",
    "Iceland": "iceland",
}
OTHER_COL_MAPPING = {"Product": "name"}

df = df.rename(columns=STORE_NAME_MAPPING)
df = df.rename(columns=OTHER_COL_MAPPING)

interested_columns = list(STORE_NAME_MAPPING.values()) + list(
    OTHER_COL_MAPPING.values()
)

# drop all rest of columns
df = df.drop(columns=[col for col in df.columns if col not in interested_columns])

# convert the dataframe to a list of dictionaries of format name: str, stores: list[str]
products = df.to_dict(orient="records")

formatted_products = []

for product in products:
    stores = [
        store
        for store, value in product.items()
        if not pd.isna(value) and store in list(STORE_NAME_MAPPING.values())
    ]
    name = product["name"]
    formatted_products.append({"name": name, "stores": stores})

with open("data.json", "w") as f:
    json.dump({"products": formatted_products}, f, indent=4)
