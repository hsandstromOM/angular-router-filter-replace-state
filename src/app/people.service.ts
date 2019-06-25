import { Injectable } from "@angular/core";

export interface Person {
	id: string;
	name: string;
	email: string;
}

@Injectable({
	providedIn: "root"
})
export class PeopleService {

	// I get the person with the given ID. Returns a Promise.
	public async getPerson( id: string ) : Promise<Person> {

		var people = await this.getPeople();
		var person = people.find(
			( person ) => {

				return( person.id === id );

			}
		);

		if ( ! person ) {

			throw( new Error( "Not found." ) );

		}

		return( person );

	}


	// I get the people. Returns a Promise.
	public async getPeople() : Promise<Person[]> {

		return([
			{
				id: "0",
				name: "John",
				email: "john@example.com"
			},
			{
				id: "1",
				name: "Tracy",
				email: "tracy@example.com"
			},
			{
				id: "2",
				name: "Carl",
				email: "carl@example.com"
			},
			{
				id: "3",
				name: "Steve",
				email: "steve@example.com"
			},
			{
				id: "4",
				name: "Joe",
				email: "joe@example.com"
			},
			{
				id: "5",
				name: "Harry",
				email: "harry@example.com"
			}
		]);

	}

}
