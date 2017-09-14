$(() => {
    const container = $('#card-container div.row');
    const infoContainer = $('#info-container');
    loadContent();

    function loadContent() {
        loadCards();
        loadCurrentUser();
    }

    function loadCurrentUser() {
        $('#client-name').remove();
        $('header.header').append($(`<div id="client-name">${data['ClientName']}</div>`));
    }

    function loadCards() {
        container.empty();
        for (let card of data["Cards"]) {
            let stts = card["CardStatus"].toLowerCase();
            let cont = $(`<div class="card-container col-md-2 col-xs-4" data-id="${card["CardNumber"]}">
                <div class="card-header">${card["CardNumber"]}</div>
                <div class="card-holder">
                    <p>Cardholder:<p>    
                    <p>${card["CardHolderName"]}<p>
                </div>
                <div class="${stts}">${card["CardStatus"]}</div>
            </div>`)

            cont.click(showCardInfo);
            container.append(cont);
        }
    }

    function showCardInfo() {
        let id = $(this).attr("data-id");
        displayInfobox(id);
        console.log(id);
    }

    function displayInfobox(id) {
        infoContainer.empty();
        let card = getCard(id);

        let box = $(`<div class="infobox col-md-6 col-xs-12">
            <h2>CARD DETAILS</h2>
            <div>Card number: ${card["CardNumber"]}</div>    
            <div>Cardholder: ${card["CardHolderName"]}</div>  
            <div>Status: ${card["CardStatus"]}</div>
            <div>Active until: ${card["ActiveUntil"]}</div>
        </div>`)
        let orderTable = $(`<table class="table table-striped">
                <tr><th>#</th><th>Orders</th></tr>
            </table>`);
        for (let order of card["Orders"]) {
            orderTable.append($(`<tr>
                <td>${order["OrderNumber"]}</td>
                <td>${order["OrderDate"]}   ${order["OrderType"]}</td>
            </tr>`));
        }

        let rechargeBtn = $(`<button class="btn btn-primary">RECHARGE CARD FOR 1 MONTH</button>`);
        rechargeBtn.click(() => rechargeCard(id));
        let hideBtn = $(`<button class="btn btn-warning">HIDE</button>`);
        hideBtn.click(hideInfobox);

        box.append(orderTable);
        box.append(rechargeBtn);
        box.append(hideBtn);
        infoContainer.append(box);
    }

    function hideInfobox() {
        $(this).parent().fadeOut();
    }

    function rechargeCard(id) {
        let card = getCard(id);
        let lastOrderNumber = Number(card["Orders"][card["Orders"].length - 1]["OrderNumber"]);
        let activeDate = new Date(card["ActiveUntil"]);
        activeDate.setMonth(activeDate.getMonth() + 1);

        card["Orders"].push({
            "OrderNumber": getNewOrderNumber(lastOrderNumber),
            "OrderDate": getDateString(new Date()),
            "OrderType": "RECHARGE"
        });
        card["ActiveUntil"] = getDateString(activeDate);

        changeCardStatus(card);
        loadContent();
        displayInfobox(id);
    }

    function changeCardStatus(card) {
        let activeDate = new Date(card["ActiveUntil"]);
        if (activeDate > new Date()) {
            card["CardStatus"] = "ACTIVE"
        } else {
            card["CardStatus"] = "INACTIVE"
        }
    }

    function getCard(id) {
        return data["Cards"].filter(c => c["CardNumber"] === id)[0];
    }

    function getDateString(date) {
        let dateStr = `${date.getFullYear()}-`;
        if ((date.getMonth() + 1) < 10) {
            dateStr += '0';
        }
        dateStr += `${date.getMonth()+1}-${date.getDate()}`;
        return dateStr;
    }

    function getNewOrderNumber(lastOrderNumber) {
        let newNumber = `${lastOrderNumber+1}`;
        while (newNumber.length < 3) {
            newNumber = '0' + newNumber;
        }
        return newNumber;
    }
});