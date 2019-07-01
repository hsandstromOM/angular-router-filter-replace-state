
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

// Import the application components and services.
import { PeopleService } from "../people.service";
import { Person } from "../people.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Result {
	content: string;
	isVisible: boolean;
	person: Person;
}

@Component({
	selector: "people-list",
	templateUrl: './people-list.component.html',
	styleUrls: [ "./people-list.component.css" ]
})
export class PeopleListComponent {

	public form: {
		filter: string;
	};
	public results: Result[];

	private activatedRoute: ActivatedRoute;
	private peopleService: PeopleService;
	private router: Router;

	// I initialize the people-list view component.
	constructor(
		activatedRoute: ActivatedRoute,
		peopleService: PeopleService,
		router: Router
		) {

		this.activatedRoute = activatedRoute;
		this.peopleService = peopleService;
		this.router = router;

		this.form = {
			filter: ( this.activatedRoute.snapshot.params.filter || "" )
		};
		this.results = [];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I apply the current filter to the view-model.
	// --
	// NOTE: This is getting called after every (input) / (ngModelChange) event on the
	// form filter.
	public applyFilter() : void {

		this.applyFilterToResults();
		this.applyFilterToRoute();

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.peopleService.getPeople().then(
			( people ) => {

				this.results = people.map(
					( person ) => {

						return({
							content: person.name.toLowerCase(),
							isVisible: true,
							person: person
						});

					}
				);

				// Now that we have the initial results populated, let's apply any
				// filtering that was predefined by the route.
				this.applyFilterToResults();

			},
			( error ) => {

				console.warn( "Oh noes!" );
				console.error( error );

			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I apply the filter to the list of people, setting the "isVisible" flag based on
	// the content match of each result item.
	private applyFilterToResults() : void {

		var filter = this.form.filter.toLowerCase();

		for ( var result of this.results ) {

			result.isVisible = ( filter )
				? result.content.includes( filter )
				: true
			;

		}

	}


	// I apply the filter to the route, persisting the current filter value to the
	// current route's parameters.
	private applyFilterToRoute() : void {

		this.router.navigate(
			[
				{
					filter: this.form.filter
				}
			],
			{
				relativeTo: this.activatedRoute,
				replaceUrl: true
			}
		);
		document.title = `Search: ${ this.form.filter }`;
	}

}
