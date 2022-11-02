import { Place } from "./Place"

export type AddPlacesTypes = {
    list: Array<Place>
}

export type InventoryItemTypes = {
    item: Place
    handleRemoveItem: (e: React.MouseEvent, uniqueId: string) =>  void
}