import React, { useState, useEffect, useRef } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { NextPage } from "next";
import { AppProps } from "next/app";
import { fetchNextProjects } from "../lib/projectsService";
import { Project } from "../types";
import { ConfirmDialog } from "primereact/confirmdialog"; // To use <ConfirmDialog> tag
import { confirmDialog } from "primereact/confirmdialog"; // To use confirmDialog method
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { AutoComplete } from "primereact/autocomplete";

// TODO: make sticky
const DatatableHeader = () => {
  return (
    <div className="flex justify-between">
      <div className="bold text-3xl">Manage projects</div>
      {/* TODO */}
      <InputText placeholder="Search" />
    </div>
  );
};

const mockClients = ["Google", "Microsoft", "Walmart", "Ebay"];

const toastLifeTimeMs = 6000;

export const ProjectsPage: NextPage<AppProps> = () => {
  const toast = useRef<Toast | null>(null);

  const [appProjects, setAppProjects] = useState<Project[]>([]);
  const [selectedAppProjects, setSelectedAppProjects] = useState<Project[]>([]);

  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const [newItemDialog, setNewItemDialog] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [newProjectName, setNewProjectName] = useState<string>("");
  const [filteredClients, setFilteredClients] = useState<string[]>(mockClients);

  const dataTableRef = useRef<DataTable | null>(null);

  useEffect(() => {
    const doJob = async () => {
      const projects = await fetchNextProjects(0, 300);
      console.log("fetched " + projects.length + " projects");
      setAppProjects(projects);
    };

    doJob();
  }, []);

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
              className="p-button-info  p-b`utton-raised"
              icon="pi pi-plus"
              label="NEW"
              onClick={() => setNewItemDialog(true)}
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

  const confirm = () => {
    confirmDialog({
      message: `Are you sure you want to proceed deleting ${selectedAppProjects.length} entries?`,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => showAccepted(selectedAppProjects.length), // TODO: waiting state
      reject: () => showCanceled(),
    });
  };

  const confirmSingleDeletion = (project: Project) => {
    confirmDialog({
      message: `Are you sure you want to delete ${project?.name} project?`,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        toast.current?.show({
          summary: "Project deleted",
          detail: `Project ${project?.name} has been deleted.`,
          life: toastLifeTimeMs,
          severity: "success",
        });
      },
      reject: () => showCanceled(),
    });
  };

  const showAccepted = (deletedCount: number) => {
    toast.current?.show({
      severity: "success",
      summary: "Deletion succeed ",
      detail: `Successfully deleted ${deletedCount} items.`,
      life: toastLifeTimeMs,
    });
  };

  const showCanceled = () => {
    toast.current?.show({
      severity: "info",
      summary: "Deletion cancelled",
      detail: `No items were affected.`,
      life: toastLifeTimeMs,
    });
  };

  const createNewProject = (newProject: Project) => {
    toast.current?.show({
      summary: "Successfully added new project.",
      life: toastLifeTimeMs,
      severity: "success",
    });
  };

  const ActionBodyTemplate = (rowData: Project) => {
    return (
      <React.Fragment>
        <Button
          className="p-button-danger p-button-rounded"
          icon="pi pi-trash"
          onClick={() => {
            confirmSingleDeletion(rowData);
          }}
        />
      </React.Fragment>
    );
  };

  // TODO: add skeleton
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
          value={appProjects}
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
          header={DatatableHeader}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3em" }}
          ></Column>
          <Column filter sortable field="name" header="NAME"></Column>
          <Column filter sortable field="client.name" header="CLIENT"></Column>
          <Column filter sortable field="client.id" header="TRACKED"></Column>
          <Column
            field="client.id"
            header="AMOUNT"
            filter
            sortable
            dataType="numeric"
          ></Column>
          <Column exportable={false} body={ActionBodyTemplate}></Column>
        </DataTable>
      </div>
      <ConfirmDialog />
      <Toast ref={toast} position="bottom-right" />
      {/* TODO: formik */}
      <Dialog
        onHide={() => setNewItemDialog(false)}
        visible={newItemDialog}
        header={() => {
          return <h1 className="text-2xl">New project</h1>;
        }}
        footer={() => {
          return (
            <div className="flex justify-center">
              <Button
                label="Create"
                className="p-button-success"
                onClick={() => {
                  setNewItemDialog(false);
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
                  setNewItemDialog(false);
                }}
              />
            </div>
          );
        }}
      >
        <div className="">
          <h1 className="mb-1">Project name</h1>
          <InputText
            className=""
            value={newProjectName}
            onChange={(e) => {
              setNewProjectName(e.target.value);
            }}
          />
          <h1 className="mb-1">Client</h1>
          <AutoComplete
            dropdown
            value={selectedClient}
            suggestions={filteredClients}
            completeMethod={(e) => {
              setFilteredClients((old) => {
                const filtered = mockClients.filter((v) =>
                  v
                    .toLocaleLowerCase()
                    .includes(e.query.trim().toLocaleLowerCase())
                );
                console.log(filteredClients);
                console.log(filtered);
                return filtered;
              });
            }}
            onChange={(e) => setSelectedClient(e.value)}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default ProjectsPage;
