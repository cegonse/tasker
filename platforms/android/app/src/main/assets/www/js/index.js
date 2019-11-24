var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        $('#add_task_button').click(addTask);
    },

    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },
};

app.initialize();


const taskContent = (id, content) => `
<div class="card task" id="task_${id}">
    <div class="card-body">
        <div class="row">
            <div class="col-9">
                ${content}
            </div>
            <div class="col-2">
                <button class="btn btn-light" id="remove_${id}">✅</button>
            </div>
        </div>
    </div>
</div>`;


async function idFor(task) {
    const encoder = new TextEncoder();
    const data = encoder.encode(task + new Date().toString());
    const hash = await crypto.subtle.digest('SHA-256', data);
    const array = Array.from(new Uint8Array(hash));
    return array.map(b => b.toString(16).padStart(2, '0')).join('');
}


async function addTask() {
    const task = $('#task_content_input').val();
    const id = await idFor(task);

    if (task === '') {
        return;
    }

    const task_contents = taskContent(id, task);

    $('#tasks').append(task_contents);
    $('#task_content_input').val('')

    $('#remove_' + id).click(function() {
        $('#task_' + id).remove();
    });
}