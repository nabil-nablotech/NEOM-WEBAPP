import { InventoryAssociationType } from "./SearchResultsTabsProps"

export type AddPlacesTypes = {
    list: Array<InventoryAssociationType>
}

export type InventoryItemTypes = {
    item: InventoryAssociationType
    handleRemoveItem: (e: React.MouseEvent, id: number) =>  void
}