import Center from "../components/Center";
import {DataTable} from "primereact/datatable";
import {Toolbar} from "primereact/toolbar";
import {Column} from "primereact/column";
import {ConfirmDialog} from "primereact/confirmdialog";
import {Toast} from "primereact/toast";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {AutoComplete} from "primereact/autocomplete";
import React, {useEffect, useRef, useState} from "react";
import {Client, Project} from "../types";
import {clientsDto} from "../sampleData";
import {InputTextarea} from "primereact/inputtextarea";

const toastLifeTimeMs = 2000;

export default function ClientsPage() {
    const toast = useRef<Toast | null>(null);

    const [clients, setClients] = useState<Client[]>([]);
    const [selectedAppProjects, setSelectedAppProjects] = useState<Project[]>([]);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [dialogClient, setDialogClient] = useState<Client | null>(null);
    const [newItemDialog, setDialogOpen] = useState<boolean>(false);
    const [newProjectName, setNewProjectName] = useState<string>("");

    const dataTableRef = useRef<DataTable | null>(null);

    useEffect(() => {
        setClients([...clientsDto]);
    }, []);

    const ActionBodyTemplate = (rowData: Client) => {
        return (
            <React.Fragment>
                <div className="flex">
                    <Button
                        className="p-button-success p-button-rounded"
                        icon="pi pi-pencil"
                        onClick={() => {
                            setDialogClient(rowData)
                            setIsEditing(true);
                            setDialogOpen(true);
                        }}
                    />
                    <div className="ml-2">
                        <Button
                            className="p-button-danger p-button-rounded"
                            icon="pi pi-trash"
                            onClick={() => {
                                alert("Not implemented yet");
                            }}
                        />
                    </div>

                </div>
            </React.Fragment>
        );
    };


    const rightToolbarContent = () => {
        return (
            <React.Fragment>
                <Button
                    label="EXPORT"
                    className="p-button-success"
                    icon="pi pi-upload"
                    onClick={() => {
                        toast.current?.show({
                            content: "NOT IMPLEMENTED YET",
                            life: toastLifeTimeMs,
                            severity: "error",
                        });
                    }}
                />
            </React.Fragment>
        );
    };

    const leftToolbarContent = () => {
        return (
            <React.Fragment>
                <div className="flex">
                    <div className="mr-3">
                        <Button
                            className="p-button-info  p-button-raised"
                            icon="pi pi-plus"
                            label="NEW"
                            onClick={() => {
                                setIsEditing(false);
                                setDialogClient(null);
                                setDialogOpen(true);
                            }}
                        />
                    </div>
                    {/* TODO: add undo??? */}
                    <Button
                        className="p-button-danger p-button-raised"
                        icon="pi pi-trash"
                        label="DELETE"
                        disabled={selectedAppProjects.length === 0}
                        onClick={() => {
                            confirm();
                        }}
                    />
                </div>
            </React.Fragment>
        );
    };

    return (
        <Center>
            <div className="flex flex-col justify-start items-center flex-1 overflow-auto py-5 pb-32 mx-32 mt-8 p-2">
                <Toolbar
                    left={leftToolbarContent}
                    right={rightToolbarContent}
                    className="w-full mb-8"
                />
                <div className="w-full flex justify-center items-start">
                    <DataTable
                        className="h-[400px] w-full max-w-screen-2xl"
                        value={clients}
                        ref={dataTableRef}
                        stripedRows
                        //
                        paginator
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        rows={5}
                        //
                        reorderableColumns
                        //
                        selection={selectedAppProjects}
                        dataKey="id"
                        onSelectionChange={(e) => setSelectedAppProjects(e.value)}
                        //
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        //
                        header={() => {
                            return <div>header</div>
                        }}
                    >

                        <Column
                            selectionMode="multiple"
                            headerStyle={{width: "3em"}}
                        ></Column>
                        <Column filter sortable field="name" header="NAME"></Column>
                        <Column filter sortable field="note" header="NOTE"></Column>
                        <Column exportable={false} body={ActionBodyTemplate}></Column>
                    </DataTable>
                </div>
                <ConfirmDialog/>
                <Toast ref={toast} position="bottom-right"/>
                {/* TODO: formik, editor as note input */}
                <Dialog
                    onHide={() => setDialogOpen(false)}
                    visible={newItemDialog}
                    className="w-1/2 h-1/2"
                    contentClassName="flex"
                    header={() => {
                        return <h1 className="text-2xl">{isEditing ? "Edit client" : "New client"}</h1>;
                    }}
                    footer={() => {
                        return (
                            <div className="flex justify-center">
                                <Button
                                    label={isEditing ? "Update" : "Create"}
                                    className="p-button-success"
                                    onClick={() => {
                                        setDialogOpen(false);
                                        // createNewProject({}); // TODO
                                    }}
                                />
                                <Button
                                    label="Cancel"
                                    className="p-button-danger"
                                    onClick={() => {
                                        toast.current?.show({
                                            summary: "Cancelled",
                                            life: toastLifeTimeMs,
                                            severity: "error",
                                        });
                                        setDialogOpen(false);
                                    }}
                                />
                            </div>
                        );
                    }}
                >
                    <div className="flex flex-1 flex-col">
                        <h1 className="mb-2">Client name</h1>
                        <InputText
                            className=""
                            value={dialogClient?.name ?? ""}
                            onChange={(e) => {
                                setDialogClient(old => {
                                    let result = old ? {
                                        ...old,
                                        name: e.target.value,
                                        createdAt: Date,
                                        deletedAt: null,
                                        updatedAt: new Date()
                                    } : {
                                        id: 0,
                                        note: "",
                                        name: e.target.value,
                                        createdAt: new Date(),
                                        deletedAt: null,
                                        updatedAt: new Date()
                                    }
                                    return result;
                                });
                            }}
                        />
                        <div className="flex flex-col mt-3 flex-1">
                            <label htmlFor="new-client-note-input" className="mb-1">Note</label>
                            <InputTextarea id="new-client-note-input"

                                           className="flex-1"

                                           value={dialogClient?.note ?? ""}
                                           onChange={(e) => {
                                               setDialogClient(old => {
                                                   let result = old ? {
                                                       ...old,
                                                       note: e.target.value,
                                                   } : {
                                                       id: 0,
                                                       note: e.target.value,
                                                       name: ""
                                                   }
                                                   return result;
                                               });
                                           }}
                            />
                        </div>
                    </div>
                </Dialog>
            </div>
        </Center>
    );
}