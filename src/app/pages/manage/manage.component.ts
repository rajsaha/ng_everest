import { Component, OnInit } from "@angular/core";
import {
  faSearch,
  faFilter,
  faLayerGroup,
  faPager,
  faThList,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormBuilder } from "@angular/forms";
import { FilterOptionsComponent } from "./filter-options/filter-options.component";
import { PopoverService } from "@services/popover/popover.service";
import { ActivatedRoute } from "@angular/router";
import { UserService } from '@services/user/user.service';

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;
  form: FormGroup;
  isSearchFocused = false;
  isFilterFocused = false;
  username: string;
  userId: string;
  paramUsername: string;
  isSelf = false;
  userData: any;
  isLoading = false;

  // Icons
  faSearch = faSearch;
  faFilter = faFilter;
  faLayerGroup = faLayerGroup;
  faPager = faPager;
  faThList = faThList;
  faThLarge = faThLarge;

  constructor(
    private fb: FormBuilder,
    private popper: PopoverService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initForm();
    this.username = localStorage.getItem("username");
    this.checkIfSelf();
  }

  initForm() {
    this.form = this.fb.group({
      searchQuery: [""],
      filter: [""],
      collections: [true],
      posts: [false],
      view: [true],
    });
  }

  checkIfSelf() {
    this.route.params.subscribe(async (param) => {
      this.isLoading = true;
      this.paramUsername = param.username;
      await this.getUserId(this.paramUsername);
      if (this.paramUsername === this.username) {
        this.isSelf = true;
      } else {
        this.isSelf = false;
      }

      this.userData = {
        username: this.paramUsername,
        userId: this.userId,
        isSelf: this.isSelf
      }
      this.isLoading = false;
    });
  }

  async getUserId(paramUsername: string) {
    const result: any = await this.userService.getUserId(paramUsername);
    this.userId = result;
  }

  viewCollections() {
    this.form.get("collections").patchValue(true);
    this.form.get("posts").patchValue(false);
  }

  viewPosts() {
    this.form.get("collections").patchValue(false);
    this.form.get("posts").patchValue(true);
  }

  searchFocusIn() {
    this.isSearchFocused = true;
  }

  searchFocusOut() {
    this.isSearchFocused = false;
  }

  showFilterOptions(origin: HTMLElement) {
    const ref = this.popper.open<{}>(
      {
        content: FilterOptionsComponent,
        origin,
        data: {
          position: "vertical",
        },
      },
      "vertical"
    );

    ref.afterClosed$.subscribe((res) => {
      if (res.data && res.data["isDeleted"]) {
      }
    });
  }
}
