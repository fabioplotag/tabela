document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector('#maintenanceTable tbody');

    // Carregar dados do localStorage ao iniciar
    loadData();

    document.getElementById('maintenanceForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const date = document.getElementById('date').value;
        const service = document.getElementById('service').value;
        const cost = document.getElementById('cost').value;

        addRow(date, service, cost);

        // Salvar os dados no localStorage
        saveData();
        
        // Limpa os campos do formulário
        document.getElementById('maintenanceForm').reset();
    });

    function addRow(date, service, cost) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${date}</td>
            <td>${service}</td>
            <td>${cost}</td>
            <td><button onclick="removeRow(this)">Remover</button></td>
        `;
        tableBody.appendChild(row);
    }

    function removeRow(button) {
        button.parentElement.parentElement.remove();
        saveData(); // Atualiza os dados no localStorage após remoção
    }

    function saveData() {
        const rows = Array.from(tableBody.rows).map(row => ({
            date: row.cells[0].textContent,
            service: row.cells[1].textContent,
            cost: row.cells[2].textContent
        }));
        localStorage.setItem('maintenanceData', JSON.stringify(rows));
    }

    function loadData() {
        const savedData = localStorage.getItem('maintenanceData');
        if (savedData) {
            JSON.parse(savedData).forEach(item => addRow(item.date, item.service, item.cost));
        }
    }
});
