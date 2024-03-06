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
            style={{ marginRight: "50px", marginLeft: "50px", height: "1000px", marginTop: "30px" }}
            ref={tableRef}
        >
            <Grid container justifyContent="flex-end" spacing={1} style={{ marginBottom: "20px" }}>
                <Grid item>
                {/* <PrimaryButton
                        styles={buttonStyles}
                        onClick={() => handleButtonClick("Button 1")}
                        text="Button 1"
                        checked={selectedButton === "Button 1"}
                    /> */}
                    <PrimaryButton
                        onClick={() => handleButtonClick("Enquiry List")}
                        text="Enquiry List"
                        style={{ backgroundColor: selectedButton === "Enquiry List" ? 'green' : undefined }}
                    />
                </Grid>
                <Grid item>
                    <PrimaryButton
                        onClick={() => handleButtonClick("Waiting Assessment")}
                        text="Waiting Assessment"
                        style={{ backgroundColor: selectedButton === "Waiting Assessment" ? 'green' : undefined }}
                    />
                </Grid>
                <Grid item>
                    <PrimaryButton
                        onClick={() => handleButtonClick("Booked Assessment")}
                        text="Booked Assessment"
                        style={{ backgroundColor: selectedButton === "Booked Assessment" ? 'green' : undefined }}
                    />
                </Grid>
                <Grid item>
                    <PrimaryButton
                        onClick={() => handleButtonClick("Active List")}
                        text="Active List"
                        style={{ backgroundColor: selectedButton === "Active List" ? 'green' : undefined }}
                    />
                </Grid>
            </Grid>
            <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Client Name</StyledTableCell>
                            <StyledTableCell>Age</StyledTableCell>
                            <StyledTableCell>Opened</StyledTableCell>
                            <StyledTableCell>Days</StyledTableCell>
                            <StyledTableCell>Priority</StyledTableCell>
                            <StyledTableCell>Site</StyledTableCell>
                            <StyledTableCell onClick={handleTypeHeaderClick}>Type</StyledTableCell> {/* Adding onClick to Type header */}
                            <StyledTableCell>Service Category</StyledTableCell>
                            <StyledTableCell>Funding Source</StyledTableCell>
                            <StyledTableCell>Funding Start</StyledTableCell>
                            <StyledTableCell>Funding End</StyledTableCell>
                            <StyledTableCell>Email Address</StyledTableCell>
                            <StyledTableCell>Mobile Number</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.map((row: any, index: number) => (
                            <StyledTableRow
                                key={index}
                                onContextMenu={(e) => handleRowRightClick(e, row)}
                                onClick={() => handleRowLeftClick(row)}
                                onMouseEnter={() => setHoveredRow(index)}
                                onMouseLeave={() => setHoveredRow(null)}
                                style={{ backgroundColor: hoveredRow === index ? "#f0f0f0" : "inherit" }}
                            >
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.age}</TableCell>
                                <TableCell>{row.opened}</TableCell>
                                <TableCell>{row.days}</TableCell>
                                <TableCell>{row.priority}</TableCell>
                                <TableCell>{row.site}</TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell
                                    style={{
                                        backgroundColor: getBackgroundColor(row.serviceCategory),
                                        color: row.serviceCategory === "Behaviour Support" ? "black" : "white",
                                    }}
                                >
                                    {row.serviceCategory}
                                </TableCell>
                                <TableCell>{row.fundingSource}</TableCell>
                                <TableCell>{row.fundingStart}</TableCell>
                                <TableCell>{row.fundingEnd}</TableCell>
                                <TableCell>{row.emailAddress}</TableCell>
                                <TableCell>{row.mobileNumber}</TableCell>
                            </StyledTableRow>
                        ))}
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
                isOpen={dialogOpen}
                onDismiss={_dismissPanel}
                type={PanelType.smallFixedFar}
                //customWidth='1080'
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
