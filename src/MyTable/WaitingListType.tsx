import React, { useState, useEffect, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import { DefaultButton, Dropdown, IDropdownOption, Panel, PanelType, PrimaryButton, ComboBox, IComboBox, IComboBoxOption } from "@fluentui/react";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    // Dialog,
    // DialogTitle,
    // DialogContent,
    // DialogActions,
    // Button,
    Grid,
} from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
// import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/Send';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { parseISO, differenceInYears, differenceInDays } from 'date-fns';

interface Row {
    name: string;
    age: number;
    opened: string;
    days: number;
    priority: string;
    site: string;
    type: string;
    serviceCategory: string;
    fundingSource: string;
    fundingStart: string;
    fundingEnd: string;
    emailAddress: string;
    mobileNumber: string;
    sabs_waitlistcatagory: String
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: "#1769aa",
    color: theme.palette.common.white,
    fontSize: 14,
    fontWeight: "bold",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const WaitingListType: React.FC<IProps> = (props) => {
    const [menuPosition, setMenuPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [types, setTypes] = useState<any[]>([]);
    const tableRef = useRef<HTMLDivElement>(null);
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const [item, setItem] = useState<any>(null);
    const [selectedType, setSelectedType] = useState<string | number>('');
    const [selectedCategory, setSelectedCategory] = useState<string | number>('');
    const [showTypePopup, setShowTypePopup] = useState(false); // State to control showing type popup
    const [selectedRow, setSelectedRow] = useState<Row | null>(null);
    const [selectedTypeOptions, setSelectedTypeOptions] = useState<string[]>([]);

    const getBackgroundColor = (category: string) => {
        switch (category) {
            case "Occupational Therapy":
                return "#f44336";
            case "Psychology":
                return "#29b6f6";
            case "Behaviour Supports":
                return "#fbc02d";
            case "Speech Pathology":
                return "#ba68c8";
            case "Physiotherapy":
                return "#f06292";
            default:
                return "#ffffff";
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
                setSelectedRow(null);
            }
        };
        window.addEventListener("click", handleOutsideClick);
        return () => window.removeEventListener("click", handleOutsideClick);
    }, []);

    const handleRowRightClick = (e: React.MouseEvent<HTMLTableRowElement>, row: Row) => {
        e.preventDefault();
        setMenuPosition({ x: e.clientX, y: e.clientY });
        //setSelectedRow(row);
    };

    const handleRowLeftClick = (row: Row) => {
        console.log("Clicked row:", row);
        setDialogOpen(true);
        setItem(row);
        if (row.sabs_waitlistcatagory)
        oncategorychange(row.sabs_waitlistcatagory.toString());
        setSelectedCategory(row.sabs_waitlistcatagory.toString());
        setSelectedType(row.type);
    };
    

    const oncategorychange = (selectedCategory: string | number) => {
        setSelectedCategory(selectedCategory);
        const types = props.waitlisttypes.filter((wt: any) => wt.sabs_category === selectedCategory);
        types.map((typ: any) => {
            typ.key = typ.sabs_type;
            typ.text = typ.sabs_type;
        })
        setTypes(types);
    }

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleEditClick = () => {
        alert(`Edit button was clicked`);
        setSelectedRow(null); // Close the menu
    };

    const handleButtonClick = (buttonName: string) => {
        props.onButtonClick(buttonName);
        setSelectedButton(buttonName);
        oncategorychange(buttonName);
    };

        const handleDropdownChange = (id: string) => (ev: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
        if (option) {
            console.log(`Dropdown ${id} selected option:`, option);
            if (id === 'category') {
                oncategorychange(option.key);
            }
            else
            setSelectedType(option.key);
        }
    };


    // const handleTypeComboBoxChange = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string): void => {
    //     if (option) {
    //         console.log('Type ComboBox selected option:', option);

    //         const selectedType = types[index as number];
    //         console.log('Selected type:', selectedType);
    //     }
    // };

    // const handleTypeComboBoxChange = (event: React.FormEvent<IComboBox>, options?: IComboBoxOption, index?: number, value?: string): void => {
    //     if (options) {
    //         const selectedOptions = Array.isArray(options) ? options.map(option => option.key as string) : [options.key as string];
    //         setSelectedTypeOptions(selectedOptions);
    //     }
    // };

    //  // Function to handle ComboBox change
    //  const handleTypeComboBoxChange = (event: React.FormEvent<IComboBox>, options?: IComboBoxOption, index?: number, value?: string): void => {
    //     if (options) {
    //         const selectedOption = options.key as string;
    //         const updatedOptions = [...selectedTypeOptions, selectedOption]; // Add the selected option to the array
    //         setSelectedTypeOptions(updatedOptions);
    //     }
    // };

    // Function to handle ComboBox change
const handleTypeComboBoxChange = (event: React.FormEvent<IComboBox>, options?: IComboBoxOption, index?: number, value?: string): void => {
    if (options) {
        const selectedOption = options.key as string;
        const isChecked = options.selected;
        
        // Update selectedTypeOptions based on whether the option is checked or unchecked
        if (isChecked) {
            const updatedOptions = [...selectedTypeOptions, selectedOption]; // Add the selected option to the array
            setSelectedTypeOptions(updatedOptions);
        } else {
            const updatedOptions = selectedTypeOptions.filter(option => option !== selectedOption); // Remove the unchecked option from the array
            setSelectedTypeOptions(updatedOptions);
        }
    }
};


    // const hardcodedOptions: IComboBoxOption[] = [
    //     { key: 'option1', text: 'Option 1' },
    //     { key: 'option2', text: 'Option 2' },
    //     { key: 'option3', text: 'Option 3' },
    // ];
    // const allOptions = [...hardcodedOptions, ...types];
    // console.log('All options:', allOptions);

    const _dismissPanel = () => {
        setDialogOpen(false);
    }

    const onSave = () => {
        props.onSaveClick(item, selectedCategory, selectedType);
        setDialogOpen(false);
    }

    const buttonStyles = { root: { marginRight: 8 } };

    const handleTypeHeaderClick = () => {
        setShowTypePopup(true);

    };

    const handleFinishClick = () => {
        setShowTypePopup(false);
    };

    const getFundingSource = (item: any): string => {
        if (props.plantypes && props.plantypes.length > 0 && props.fundingtypes && props.fundingtypes.length > 0 && item.sabs_fundingtype && item.sabs_plantype) {
            const ft = props.fundingtypes.find((fti: any) => fti.TypeCode === item.sabs_fundingtype);
            if (ft) {
                let fundingsource = '';
                fundingsource = ft.TypeText;
                const pt = props.plantypes.find((pti: any) => pti.TypeCode === item.sabs_plantype);
                if (pt)
                    fundingsource += '-' + pt.TypeText;
                return fundingsource;
            }
        }
        return '';
    }

    // const filteredData = selectedTypeOptions.length > 0
    //     ? props.data.filter((row: Row) => selectedTypeOptions.includes(row.type))
    //     : selectedTypeOptions.length === 0
    //         ? props.data
    //         : [];

    // Filtered data based on selected options
    const filteredData = selectedTypeOptions.length > 0
        ? props.data.filter((row: Row) => selectedTypeOptions.includes(row.type))
        : props.data;

    return (
        <div
            style={{ marginRight: "50px", marginLeft: "50px", height: "1000px", marginTop: "30px", fontFamily: 'Calibri', }}
            ref={tableRef}
        >
            <Grid container justifyContent="flex-end" spacing={1}>
                <Grid item>
                    <PrimaryButton
                        onClick={() => handleButtonClick("Enquiry List")}
                        text="Enquiry List"
                        style={{
                            backgroundColor: selectedButton === "Enquiry List" ? 'green' : '#1769AA', // Change 'blue' to 'red'
                            fontFamily: 'Calibri',
                            border: 'none'
                        }}
                    />
                </Grid>
                <Grid item>
                    <PrimaryButton
                        onClick={() => handleButtonClick("Waiting Assessment")}
                        text="Waiting Assessment"
                        style={{
                            backgroundColor: selectedButton === "Waiting Assessment" ? 'green' : '#1769AA', // Change 'blue' to 'red'
                            fontFamily: 'Calibri',
                            border: 'none'
                        }}
                    />
                </Grid>
                <Grid item>
                    <PrimaryButton
                        onClick={() => handleButtonClick("Booked Assessment")}
                        text="Booked Assessment"
                        style={{
                            backgroundColor: selectedButton === "Booked Assessment" ? 'green' : '#1769AA', // Change 'blue' to 'red'
                            fontFamily: 'Calibri',
                            border: 'none'
                        }}
                    />
                </Grid>
                <Grid item>
                    <PrimaryButton
                        onClick={() => handleButtonClick("Active List")}
                        text="Active List"
                        style={{
                            backgroundColor: selectedButton === "Active List" ? 'green' : '#1769AA', // Change 'blue' to 'red'
                            fontFamily: 'Calibri',
                            border: 'none'
                        }}
                    />
                </Grid>
            </Grid>
            <TableContainer component={Paper} style={{ marginTop: "3px", overflowX: 'auto' }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{ fontFamily: 'Calibri' }}>Client Name</StyledTableCell>
                            <StyledTableCell style={{ fontFamily: 'Calibri' }}>Age</StyledTableCell>
                            <StyledTableCell style={{ fontFamily: 'Calibri' }}>Opened</StyledTableCell>
                            <StyledTableCell style={{ fontFamily: 'Calibri' }}>Days</StyledTableCell>
                            <StyledTableCell style={{ fontFamily: 'Calibri' }}>Priority</StyledTableCell>
                            <StyledTableCell style={{ fontFamily: 'Calibri' }}>Site</StyledTableCell>
                            <StyledTableCell onClick={handleTypeHeaderClick} style={{ minWidth: '100px', fontFamily: 'Calibri' }}>Type</StyledTableCell>
                            <StyledTableCell style={{ fontFamily: 'Calibri' }}>Service Category</StyledTableCell>
                            <StyledTableCell style={{ fontFamily: 'Calibri' }}>Funding Source</StyledTableCell>
                            {/* <StyledTableCell style={{ fontFamily: 'Calibri' }}>Funding Start</StyledTableCell>
                            <StyledTableCell style={{ fontFamily: 'Calibri' }}>Funding End</StyledTableCell> */}
                            <StyledTableCell style={{ fontFamily: 'Calibri' }}>Email Address</StyledTableCell>
                            <StyledTableCell style={{ fontFamily: 'Calibri' }}>Mobile Number</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    {filteredData.map((row: any, index: number) => {
                        // {props.data.map((row: any, index: number) => {
                            const age = row.sabs_dob ? differenceInYears(new Date(), parseISO(row.sabs_dob)) : '';
                            const daysSinceCreation = differenceInDays(new Date(), parseISO(row.createdon));
                            const daysSinceOpened = differenceInDays(parseISO(row.createdon), parseISO(row.opened));
                            return (
                                <StyledTableRow
                                    key={index}
                                    onContextMenu={(e) => handleRowRightClick(e, row)}
                                    onClick={() => handleRowLeftClick(row)}
                                    onMouseEnter={() => setHoveredRow(index)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                    style={{ backgroundColor: hoveredRow === index ? "#f0f0f0" : "inherit" }}
                                >
                                    <TableCell style={{ fontFamily: 'Calibri' }}>{row.name}</TableCell>
                                    <TableCell style={{ fontFamily: 'Calibri' }}>{age}</TableCell>
                                    <TableCell style={{ fontFamily: 'Calibri' }}>{row.opened}</TableCell>
                                    {/* <TableCell style={{ fontFamily: 'Calibri' }}>{daysSinceOpened}</TableCell> */}
                                    <TableCell style={{ fontFamily: 'Calibri' }}>{daysSinceCreation}</TableCell>
                                    <TableCell style={{ fontFamily: 'Calibri' }}>{row.priority}</TableCell>
                                    <TableCell style={{ fontFamily: 'Calibri' }}>{row.site}</TableCell>
                                    <TableCell style={{ fontFamily: 'Calibri' }}>{row.type}</TableCell>
                                    <TableCell
                                        style={{
                                            backgroundColor: getBackgroundColor(row.serviceCategory),
                                            color: row.serviceCategory === "Behaviour Supports" ? "black" : "white",
                                            fontFamily: 'Calibri'
                                        }}
                                    >
                                        {row.serviceCategory}
                                    </TableCell>
                                    {/* <TableCell style={{ fontFamily: 'Calibri' }}>{row.fundingSource}</TableCell> */}
                                    <TableCell style={{ fontFamily: 'Calibri' }}>{getFundingSource(row)}</TableCell>
                                    {/* <TableCell style={{ fontFamily: 'Calibri' }}>{row.fundingStart}</TableCell>
                                    <TableCell style={{ fontFamily: 'Calibri' }}>{row.fundingEnd}</TableCell> */}
                                    <TableCell style={{ fontFamily: 'Calibri' }}>{row.emailAddress}</TableCell>
                                    <TableCell style={{ fontFamily: 'Calibri' }}>{row.mobileNumber}</TableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>

                    
                </Table>
            </TableContainer>
            {showTypePopup && (
                <Panel
                    isOpen={showTypePopup}
                    onDismiss={() => setShowTypePopup(false)}
                    type={PanelType.smallFixedFar}
                    closeButtonAriaLabel="Close"
                    headerText='Select Types'
                >
                    <div>
                        <ComboBox
                            multiSelect
                            options={types}
                            placeholder="Select type"
                            onChange={handleTypeComboBoxChange}
                        />

                        <br />
                        <PrimaryButton onClick={handleFinishClick} styles={buttonStyles}>
                            Finish
                        </PrimaryButton>
                    </div>
                </Panel>
            )}
            {selectedRow && (
                <StyledMenu
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: menuPosition.y, left: menuPosition.x }}
                    open={Boolean(selectedRow)}
                    onClose={() => setSelectedRow(null)}
                >
                    <MenuItem onClick={handleEditClick} disableRipple>
                        <EditIcon />
                        Edit
                        {/* {selectedRow.name} */}
                    </MenuItem>
                    <MenuItem onClick={() => setSelectedRow(null)} disableRipple>
                        <FileCopyIcon />
                        Send Service In-take from
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    {/* <MenuItem onClick={() => setSelectedRow(null)} disableRipple>
            <ArchiveIcon />
            Archive
          </MenuItem>
          <MenuItem onClick={() => setSelectedRow(null)} disableRipple>
            <MoreHorizIcon />
            More
          </MenuItem> */}
                </StyledMenu>
            )}
            {/* <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Row Information</DialogTitle>
        <DialogContent>
          <div>
            <p><strong>Client Name:</strong> {selectedRow?.name}</p>
            <p><strong>Age:</strong> {selectedRow?.age}</p>
            <p><strong>Opened:</strong> {selectedRow?.opened}</p>
            <p><strong>Days:</strong> {selectedRow?.days}</p>
            <p><strong>Priority:</strong> {selectedRow?.priority}</p>
            <p><strong>Site:</strong> {selectedRow?.site}</p>
            <p><strong>Type:</strong> {selectedRow?.type}</p>
            <p><strong>Service Category:</strong> {selectedRow?.serviceCategory}</p>
            <p><strong>Funding Source:</strong> {selectedRow?.fundingSource}</p>
            <p><strong>Funding Start:</strong> {selectedRow?.fundingStart}</p>
            <p><strong>Funding End:</strong> {selectedRow?.fundingEnd}</p>
            <p><strong>Email Address:</strong> {selectedRow?.emailAddress}</p>
            <p><strong>Mobile Number:</strong> {selectedRow?.mobileNumber}</p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog> */}

            <Panel
                isOpen={dialogOpen && item && item.sabs_waitlistcatagory.length > 0}
                onDismiss={_dismissPanel}
                type={PanelType.smallFixedFar}
                //customWidth='1080'
                closeButtonAriaLabel="Close"
                headerText='Edit Waitlist'
            >
                <div>
                    {item &&
                        <Dropdown
                            label='Category'
                            options={props.categories}
                            onChange={handleDropdownChange('category')}
                            selectedKey={selectedCategory && selectedCategory !== ''? selectedCategory : ''}
                        />
                    }
                    <Dropdown
                        label='Type'
                        options={types}
                        onChange={handleDropdownChange('type')}
                        selectedKey={selectedType && selectedType !== ''? selectedType : ''}
                    />
                    <br />
                    <PrimaryButton onClick={onSave} styles={buttonStyles}>
                        Save
                    </PrimaryButton>
                    <DefaultButton onClick={handleCloseDialog}>Cancel</DefaultButton>

                </div>
            </Panel>
        </div>
    );
};

export default WaitingListType;

interface IProps {
    data: any;
    waitlisttypes: any;
    categories: any;
    fundingtypes: any;
    plantypes: any;
    onButtonClick: (buttonName: string) => void;
    onSaveClick: (item: any, category: string | number, type: string | number) => void;
}
