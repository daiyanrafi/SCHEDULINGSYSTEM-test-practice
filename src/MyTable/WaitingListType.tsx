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
    const [selectedRow, setSelectedRow] = useState<Row | null>(null);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [types, setTypes] = useState<any[]>([]);
    const tableRef = useRef<HTMLDivElement>(null);
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const [showTypePopup, setShowTypePopup] = useState(false); // State to control showing type popup

    const getBackgroundColor = (category: string) => {
        switch (category) {
            case "Occupational Therapy":
                return "#f44336";
            case "Psychology":
                return "#29b6f6";
            case "Behaviour Support":
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
        let categories: any[] = [];
        props.waitlisttypes.map((cat: any) => {
            if (!categories.find(ct => cat.sabs_category === ct.key)) {
                categories.push({ key: cat.sabs_category, text: cat.sabs_category });
            }
        });

        setCategories(categories);
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
        //setSelectedRow(row);
        setDialogOpen(true);
    };

    // const oncategorychange = (evt: any, fieldname: string, value?: any) => {
    //   console.log(value);
    //   alert('hello')
    // }

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleEditClick = () => {
        alert(`Edit button was clicked`);
        setSelectedRow(null); // Close the menu
    };

    const handleButtonClick = (buttonName: string) => {
        setSelectedButton(buttonName);
        console.log("Button clicked:", buttonName);
    };

    const handleDropdownChange = (id: string) => (ev: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
        if (option) {
            console.log(`Dropdown ${id} selected option:`, option);
            if (id === 'category') {
                const types = props.waitlisttypes.filter((wt: any) => wt.sabs_category === option.key);
                types.map((typ: any) => {
                    typ.key = typ.sabs_type;
                    typ.text = typ.sabs_type;
                })
                setTypes(types);
            }
        }
    };

    // const handleTypeComboBoxChange = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string): void => {
    //     if (option) {
    //         console.log('Type ComboBox selected option:', option);
    //         const selectedType = types[index as number];
    //         console.log('Selected type:', selectedType);
    //     }
    // };


    const handleTypeComboBoxChange = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string): void => {
        if (option) {
            console.log('Type ComboBox selected option:', option);
            // Get the selected type from the options using the index
            const selectedType = types[index as number]; // Assuming the index corresponds to the selected type in the types array

            // Now you can use the selectedType as needed
            console.log('Selected type:', selectedType);
        }
    };

    const hardcodedOptions: IComboBoxOption[] = [
        { key: 'option1', text: 'Option 1' },
        { key: 'option2', text: 'Option 2' },
        { key: 'option3', text: 'Option 3' },
    ];
    const allOptions = [...hardcodedOptions, ...types];
    console.log('All options:', allOptions);

    const _dismissPanel = () => {
        setDialogOpen(false);
    }


    const onSave = () => {
        setDialogOpen(false);
    }

    const buttonStyles = { root: { marginRight: 8 } };

    const handleTypeHeaderClick = () => {
        setShowTypePopup(true);
    };

    const handleFinishClick = () => {
        setShowTypePopup(false);
    };

    return (
        <div
            style={{ marginRight: "50px", marginLeft: "50px", height: "1000px", marginTop: "30px", fontFamily: 'Calibri' }}
            ref={tableRef}
        >
            <Grid container justifyContent="flex-end" spacing={1} style={{ marginBottom: "20px" }}>
                <Grid item>
                    <PrimaryButton
                        onClick={() => handleButtonClick("Enquiry List")}
                        text="Enquiry List"
                        style={{ backgroundColor: selectedButton === "Enquiry List" ? 'green' : undefined }}
                    >
                        Enquiry List
                    </PrimaryButton>
                </Grid>
                <Grid item>
                    <PrimaryButton
                        onClick={() => handleButtonClick("Waiting Assessment")}
                        text="Waiting Assessment"
                        style={{ backgroundColor: selectedButton === "Waiting Assessment" ? 'green' : undefined }}
                    >
                        Waiting Assessment
                    </PrimaryButton>
                </Grid>
                <Grid item>
                    <PrimaryButton
                        onClick={() => handleButtonClick("Booked Assessment")}
                        text="Booked Assessment"
                        style={{ backgroundColor: selectedButton === "Booked Assessment" ? 'green' : undefined }}
                    >
                        Booked Assessment
                    </PrimaryButton>
                </Grid>
                <Grid item>
                    <PrimaryButton
                        onClick={() => handleButtonClick("Active List")}
                        text="Active List"
                        style={{ backgroundColor: selectedButton === "Active List" ? 'green' : undefined }}
                    >
                        Active List
                    </PrimaryButton>
                </Grid>
            </Grid>
            <TableContainer component={Paper} style={{ marginTop: "20px", overflowX: 'auto' }}>
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
                            <StyledTableCell style={{ fontFamily: 'Calibri' }}>Funding Start</StyledTableCell>
                            <StyledTableCell style={{ fontFamily: 'Calibri' }}>Funding End</StyledTableCell>
                            <StyledTableCell style={{ fontFamily: 'Calibri' }}>Email Address</StyledTableCell>
                            <StyledTableCell style={{ fontFamily: 'Calibri' }}>Mobile Number</StyledTableCell>
                        </TableRow>
                    </TableHead>
    
                    <TableBody>
                        {props.data.map((row: any, index: number) => {
                            const age = differenceInYears(new Date(), parseISO(row.sabs_dob));
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
                                    <TableCell style={{ fontFamily: 'Calibri' }}>{daysSinceOpened}</TableCell>
                                    <TableCell style={{ fontFamily: 'Calibri' }}>{daysSinceCreation}</TableCell>
                                    <TableCell style={{ fontFamily: 'Calibri' }}>{row.priority}</TableCell>
                                    <TableCell style={{ fontFamily: 'Calibri' }}>{row.site}</TableCell>
                                    <TableCell style={{ fontFamily: 'Calibri' }}>{row.type}</TableCell>
                                    <TableCell
                                        style={{
                                            backgroundColor: getBackgroundColor(row.serviceCategory),
                                            color: row.serviceCategory === "Behaviour Support" ? "black" : "white",
                                            fontFamily: 'Calibri'
                                        }}
                                    >
                                        {row.serviceCategory}
                                    </TableCell>
                                    <TableCell style={{ fontFamily: 'Calibri' }}>{row.fundingSource}</TableCell>
                                    <TableCell style={{ fontFamily: 'Calibri' }}>{row.fundingStart}</TableCell>
                                    <TableCell style={{ fontFamily: 'Calibri' }}>{row.fundingEnd}</TableCell>
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
                            options={allOptions}
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
                    </MenuItem>
                    <MenuItem onClick={() => setSelectedRow(null)} disableRipple>
                        <FileCopyIcon />
                        Send Service In-take from
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                </StyledMenu>
            )}
    
            <Panel
                isOpen={dialogOpen}
                onDismiss={_dismissPanel}
                type={PanelType.smallFixedFar}
                closeButtonAriaLabel="Close"
                headerText='Edit Waitlist'
            >
                <div>
                    <Dropdown
                        label='Category'
                        options={categories}
                        onChange={handleDropdownChange('category')}
                    />
                    <Dropdown
                        label='Type'
                        options={types}
                        onChange={handleDropdownChange('type')}
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
}
