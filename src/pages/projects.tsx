import React, { useState, useEffect, useRef } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { NextPage } from "next";
import { AppProps } from "next/app";
import { fetchNextProjects, fetchProjects } from "../lib/projectsService";
import { Project } from "../types";
import { ConfirmDialog } from "primereact/confirmdialog"; // To use <ConfirmDialog> tag
import { confirmDialog } from "primereact/confirmdialog"; // To use confirmDialog method
import { Toast } from "primereact/toast";

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

const toastLifeTimeMs = 6000;

export const ProjectsPage: NextPage<AppProps> = () => {
  const [appProjects, setAppProjects] = useState<Project[]>([]);
  const [selectedAppProjects, setSelectedAppProjects] = useState<Project[]>([]);
  const toast = useRef<Toast | null>(null);

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
        <Button className="p-button-info  p-button-raised" label="NEW" />
      </React.Fragment>
    );
  };

  const leftToolbarContent = () => {
    return (
      <React.Fragment>
        <Button
          className="p-button-danger p-button-raised"
          label="DELETE"
          disabled={selectedAppProjects.length === 0}
          onClick={() => {
            confirm();
          }}
        />
      </React.Fragment>
    );
  };

  const confirm = () => {
    confirmDialog({
      message: `Are you sure you want to proceed deleting ${selectedAppProjects.length} entries?`,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => showAccepted(selectedAppProjects.length), // TODO: waiting state
      reject: () => showCanceled(selectedAppProjects.length),
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

  const showCanceled = (deletedCount: number) => {
    toast.current?.show({
      severity: "info",
      summary: "Deletion cancelled",
      detail: `No items were affected.`,
      life: toastLifeTimeMs,
    });
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
        </DataTable>
      </div>
      <ConfirmDialog />
      <Toast ref={toast} position="bottom-right" />
    </div>
  );
};

export default ProjectsPage;
