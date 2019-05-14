$(document).ready(()=>main());

function main() {
	spawnToolbar();
	setButtonEvents()
	logData();

	$('body').append('<div class="loader"></div>');
	//$('.loader').load('html/dga/intro.html');

	spawnModules();
}

/* Classes */
class Module {
	constructor( name, content ) {
		this.name = name;
		this.content = content;
	}
}

/* Functions */

/** create toolbar for template manipulation actions
  */
function spawnToolbar() {
	const toolbar = `
		<div class="toolbar">
			<div class="create">
				<select id="module-name">
					<option value="intro">Intro</option>
					<option value="content-horizontal">Content Horizontal</option>
				</select>
				<textarea id="module-content">Default</textarea>
				<button id="add">Add</button>
			</div>
			<div class="destroy">
				<button id="reset">Reset</button>
			</div>
		</div>`;
	$( 'body' ).prepend( toolbar );
}

function spawnModules() {
	console.log( 'spawnModules()' );
	const moduleArea = $( '.loader' );
	const moduleData = db.get( 'modules' ).value(); // array of objects containing module data
	console.log( moduleData );

	for( const m of moduleData ) {
		moduleArea.append(`<tr id="${ m.id }"><td></td></tr>`);
		currentModule = moduleArea.find( `tr#${ m.id } td` );
		currentModule.load( getModuleFilename( m.name ), ()=> currentModule.find( '.module-content' ).append( m.content ) );
	}

	//$( moduleArea.find( 'tr#test td' ) ).load( getModuleFilename( 'intro' ) );
}

/** function to get a module's filename from the name of the module
  * @return {string} : filename
  */
function getModuleFilename( name ) {
	const filename = `html/dga/${ name }.html`;
	return filename;
}

function logData() {
	const state = db.getState();
	const str = JSON.stringify( state, null, 2 );
	console.log(str);
}

/* Event listeners */

function setButtonEvents() {
	$( '#add' ).click( ()=> {
		console.log('add');

		const moduleName = $( '#module-name option:selected' ).val();
		const moduleContent = $( '#module-content' ).val();
		addModule( moduleName, moduleContent );
		logData();
	} );

	$( '#reset' ).click( ()=> {
		reset( 'modules' );
		logData();
	} );
}

/* lowdb */

// LocalStorage is a lowdb adapter for saving to localStorage
const adapter = new LocalStorage( 'db' );
// Create database instance
const db = low( adapter );

// set default state
db.defaults({ 
	modules: []
}).write();

// test
function addTime( key ) {
  db.get( key )
    .push({ time: Date.now() })
    .write();
}

function addModule( name, content ) {
	console.log( `add module with name: ${ name }` );
	db.get( 'modules' )
		.push({
			name: name,
			content: content,
			id: Date.now()
		})
		.write();
}

// reset to empty array
function reset( key ) {
	console.log( `reset ${ key }` );
  db.set(key, [])
    .write();
}