interface FilterLabeledItem {
    value: string;
    label: string;
}

interface FilterInformationLabel {
    filterItem: FilterLabeledItem[];
}

export default FilterInformationLabel;