"use client"
import React from 'react';
import MUIDataTable from "mui-datatables";

interface IUserListProps {
    items: any[];
}

const List: React.FC<IUserListProps> = ({ items }) => {
    const columns = ["ID", "Email", "Name"];

    const data = items.map(item => [
        item._id,
        item.email,
        item.name,
    ]);

    const options = {
        filterType: 'checkbox' as 'checkbox',
        download: false,
        print: false,
        selectableRows: 'none' as 'none',
        responsive: 'simple' as 'simple',
    };

    return (
        <MUIDataTable
            title={"List"}
            data={data}
            columns={columns}
            options={options}
        />
    );
};

export default List;