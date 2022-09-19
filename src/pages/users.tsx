import React, {useEffect, useRef, useState} from "react";
import {Toast} from "primereact/toast";
import {Client, User} from "../types";
import {DataTable} from "primereact/datatable";
import {Button} from "primereact/button";
import {userRoles, userRolesDtoAssign, usersDto} from "../mock/sampleData";
import {Toolbar} from "primereact/toolbar";
import {Column} from "primereact/column";
import {ConfirmDialog} from "primereact/confirmdialog";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {UserDto} from "../typesDto";
import Link from "next/link";
import {format} from "date-fns"
import ButtonSuccess from "../components/Buttons/ButtonSuccess";
import ButtonDanger from "../components/Buttons/ButtonDanger";

const toastLifeTimeMs = 3000;

export default function UsersPage() {
    const toast = useRef<Toast | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedAppProjects, setSelectedAppProjects] = useState<User[]>([]);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [dialogUser, setDialogUser] = useState<User | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const ManagerFragment = (user: User) => {
        return (
            <React.Fragment>
                {
                    user.manager ?
                        // TODO: manager link
                        <div className="z-[5000]">
                            <Link href={`/users/${user.manager?.id}`}>
                                <div>{`${user.manager?.name} ${user.manager?.surname}`}</div>
                            </Link>
                        </div>
                        :
                        <div>TODO</div>
                }
            </React.Fragment>
        )
    }

    const dataTableRef = useRef<DataTable | null>(null);

    const ActionBodyTemplate = (rowData: User) => {
        return (
            <React.Fragment>
                <div className="flex">
                    <Button
                        className="p-button-success p-button-rounded"
                        icon="pi pi-pencil"
                        onClick={() => {
                            setDialogUser(rowData)
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

    useEffect(() => {
        setUsers([...usersDto].map((user) => {
            const manager = [...usersDto].filter(u => u.id === user.managerId);
            const foundManager: UserDto | null = manager.length > 0 ? manager[0] : null;

            let foundManagerNotDto: User | null = null;

            if (foundManager) {
                foundManagerNotDto = {
                    id: foundManager.id,
                    surname: foundManager.surname,
                    roles: [],
                    manager: null,
                    name: foundManager.name,
                    email: foundManager.email,
                    editedBy: null,
                    createdAt: foundManager.createdAt,
                    deletedAt: foundManager.deletedAt,
                    updatedAt: foundManager.updatedAt
                }
            }

            const result: User = {
                id: user.id,
                email: user.email,
                name: user.name,
                manager: foundManagerNotDto,
                editedBy: null,
                roles: [],
                surname: user.surname,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                deletedAt: null
            }

            return result;
        }));
        // setIsLoading(false);
    }, []);

    const rightToolbarContent = () => {
        return (
            <React.Fragment>
                <ButtonSuccess
                    label="EXPORT"
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
                        <ButtonSuccess
                            icon="pi pi-plus"
                            label="NEW"
                            onClick={() => {
                                setIsEditing(false);
                                setDialogUser(null);
                                setDialogOpen(true);
                            }}
                        />
                    </div>
                    {/* TODO: add undo??? */}
                    <ButtonDanger
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

    const getManagers = (): User[] => {
        const managers: String[] = [];

        const managerRoleId = userRoles.find(r => r.name === "manager")?.id;

        const managerIds = userRolesDtoAssign.filter(a => {
            return a.roleId === managerRoleId;
        }).map(r => r.ownerId);

        return users.filter(user => {
            return managerIds.includes(user.id);
        });
    }

    return (
        <div className="flex flex-col justify-start items-center flex-1 overflow-auto py-5 pb-32 mx-32 mt-8 p-2">
            <Toolbar
                left={leftToolbarContent}
                right={rightToolbarContent}
                className="w-full mb-8"
            />
            <div className="w-full flex justify-center items-start">
                <DataTable
                    className="h-[400px] w-full max-w-screen-2xl"
                    value={users}
                    ref={dataTableRef}
                    stripedRows
                    //
                    paginator
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    rows={5}
                    //
                    reorderableColumns
                    sortMode="single"
                    //
                    selection={selectedAppProjects}
                    dataKey="id"
                    onSelectionChange={(e) => setSelectedAppProjects(e.value)}
                    //
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    //
                    header={() => {
                        return <Button className="p-button p-button-text p-button-raised p-button-info"
                                       label="Clear filters" onClick={event => {
                            // dataTableRef.current?.clearState();
                            // dataTableRef.current?.reset();
                        }}/>
                    }}
                >
                    <Column
                        selectionMode="multiple"
                        headerStyle={{width: "3em"}}
                    ></Column>
                    <Column filter sortable field="id" header="ID"></Column>
                    <Column filter sortable field="name" header="NAME"></Column>
                    <Column filter sortable field="surname" header="SURNAME"></Column>
                    <Column filter sortable field="email" header="EMAIL"></Column>
                    {/* TODO add external link */}
                    <Column filter sortable field="manager.name" body={ManagerFragment} header="MANAGER"></Column>
                    <Column filter sortable
                            field="createdAt"
                            body={(rowData) => <div>
                                {format(rowData.createdAt, "dd.MM.yyyy")}
                            </div>
                            }
                            header="CREATED AT"
                    ></Column>
                    <Column filter sortable field="updatedAt" header="UPDATED AT"
                            body={(rowData: Client) =>
                                rowData.updatedAt ?
                                    <div>
                                        {format(rowData.updatedAt, "dd.MM.yyyy")}
                                    </div> :
                                    <div>-</div>}>
                    </Column>
                    <Column exportable={false} body={ActionBodyTemplate}></Column>
                </DataTable>
            </div>
            <ConfirmDialog/>
            <Toast ref={toast} position="bottom-right"/>
            {/* TODO: formik, editor as note input */}
            <Dialog
                onHide={() => setDialogOpen(false)}
                visible={dialogOpen}
                className="w-1/2 h-1/2"
                contentClassName="flex"
                header={() => {
                    return <h1 className="text-2xl">{isEditing ? "Edit user" : "New user"}</h1>;
                }}
                footer={() => {
                    return (
                        <div className="flex justify-end mr-12">
                            <ButtonSuccess
                                label={isEditing ? "Update" : "Create"}
                                onClick={() => {
                                    setDialogOpen(false);
                                    // createNewProject({}); // TODO
                                }}
                            />
                            <div className="ml-2">
                                <ButtonDanger
                                    label="Cancel"
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
                        </div>
                    );
                }}
            >
                <div className="flex flex-1 flex-col">
                    <h1 className="mb-2">Name</h1>
                    <InputText
                        className=""
                        value={dialogUser?.name ?? ""}
                        onChange={(e) => {
                            setDialogUser(old => {
                                let result: User = old ? {
                                    ...old,
                                    name: e.target.value,
                                    createdAt: old.createdAt,
                                    updatedAt: new Date(),
                                    deletedAt: null,
                                    editedBy: null
                                } : {
                                    id: 0,
                                    name: e.target.value,
                                    createdAt: new Date(),
                                    updatedAt: null,
                                    editedBy: null,
                                    deletedAt: null,
                                    surname: "",
                                    manager: null,
                                    email: "",
                                    roles: []
                                }
                                return result;
                            });
                        }}
                    />
                    <h1 className="mb-2">Surname</h1>
                    <InputText
                        className=""
                        value={dialogUser?.surname ?? ""}
                        onChange={(e) => {
                            setDialogUser(old => {
                                let result: User = old ? {
                                    ...old,
                                    surname: e.target.value,
                                    createdAt: old.createdAt,
                                    updatedAt: new Date(),
                                    deletedAt: null,
                                    editedBy: null,
                                } : {
                                    id: 0,
                                    name: e.target.value,
                                    createdAt: new Date(),
                                    editedBy: null,
                                    updatedAt: null,
                                    deletedAt: null,
                                    surname: "",
                                    manager: null,
                                    email: "",
                                    roles: []
                                }
                                return result;
                            });
                        }}
                    />
                    <h1 className="mb-2">Email</h1>
                    <InputText
                        className=""
                        value={dialogUser?.email ?? ""}
                        onChange={(e) => {
                            setDialogUser(old => {
                                let result: User = old ? {
                                    ...old,
                                    email: e.target.value,
                                    createdAt: old.createdAt,
                                    updatedAt: new Date(),
                                    deletedAt: null,
                                    editedBy: null,
                                } : {
                                    id: 0,
                                    editedBy: null,
                                    name: e.target.value,
                                    createdAt: new Date(),
                                    updatedAt: null,
                                    deletedAt: null,
                                    surname: "",
                                    manager: null,
                                    email: "",
                                    roles: []
                                }
                                return result;
                            });
                        }}
                    />
                    <h1 className="mb-2">Manager</h1>
                    <InputText
                        className=""
                        value={"TODO SEARCH"}
                    />
                </div>
            </Dialog>
        </div>
    );
}