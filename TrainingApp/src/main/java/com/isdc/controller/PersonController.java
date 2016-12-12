package com.isdc.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.isdc.model.JsonObject;
import com.isdc.model.Person;
import com.isdc.service.PersonService;

@Controller
public class PersonController {

	@Autowired
	private PersonService personService;

	@RequestMapping("/person")
	public String setupForm(Map<String, Object> map) {
		Person person = new Person();
		map.put("person", person);
		map.put("personList", personService.getAllPerson());
		return "person";
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public String addValue(@ModelAttribute Person person, BindingResult result, Map<String, Object> map) {
		Person personResult = new Person();
		personService.add(person);
		personResult = person;
		map.put("person", personResult);
		map.put("personList", personService.getAllPerson());
		return "person";
	}

	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public String editValue(@ModelAttribute Person person, BindingResult result, Map<String, Object> map) {
		Person personResult = new Person();
		personService.edit(person);
		personResult = person;
		map.put("person", personResult);
		map.put("personList", personService.getAllPerson());
		return "person";
	}

	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public String searchValue(@ModelAttribute Person person, BindingResult result, Map<String, Object> map) {
		Person personResult = new Person();
		Person searchedPerson = personService.getPerson(person.getPk());
		personResult = searchedPerson != null ? searchedPerson : new Person();
		map.put("person", personResult);
		map.put("personList", personService.getAllPerson());
		return "person";
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public String deleteValue(@ModelAttribute Person person, BindingResult result, Map<String, Object> map) {
		Person personResult = new Person();
		personService.delete(person.getPk());
		personResult = new Person();
		map.put("person", personResult);
		map.put("personList", personService.getAllPerson());
		return "person";
	}

	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String getForm() {
		return "home";
	}

	@RequestMapping(value = "/getPerson", method = RequestMethod.GET)
	@ResponseBody
	public JsonObject getPerson(@RequestParam(name = "id") int id) {
		JsonObject jsonObj = new JsonObject();
		Person searchedPerson = personService.getPerson(id);

		jsonObj.setIsin(searchedPerson.getIsin());
		jsonObj.setName(searchedPerson.getName());
		jsonObj.setPerformance_1yr(searchedPerson.getPerformance_1yr());
		jsonObj.setPerformance_2yr(searchedPerson.getPerformance_2yr());
		jsonObj.setPerformance_3yr(searchedPerson.getPerformance_3yr());

		return jsonObj;
	}

	@RequestMapping(value = "/getAllPerson", method = RequestMethod.GET, produces= { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody 
	public List<JsonObject> getAll() {
		List<Person> searchedPerson = personService.getAllPerson();
		List<JsonObject> jsonObjList = getAllelements(searchedPerson);
		return jsonObjList;
	}

	public List<JsonObject> getAllelements(List<Person> persons) {
		List<JsonObject> allPerson = new ArrayList<JsonObject>();
		
		for(Person person: persons){
			allPerson.add(adaptPerson(person));
		}
		return allPerson;
	}
	
	private JsonObject adaptPerson(Person person) {
		JsonObject jsonObj = new JsonObject();
		jsonObj.setIsin(person.getIsin());
		jsonObj.setName(person.getName());
		jsonObj.setPerformance_1yr(person.getPerformance_1yr());
		jsonObj.setPerformance_2yr(person.getPerformance_2yr());
		jsonObj.setPerformance_3yr(person.getPerformance_3yr());
		return jsonObj;
	}

}
