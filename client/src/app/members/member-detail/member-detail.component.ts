import { MemberService } from './../../_services/member.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { MessageService } from 'src/app/_services/message.service';
import { Message } from 'src/app/_models/message';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs') memeberTabs: TabsetComponent;
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activeTab: TabDirective;
  messages: Message[] = [];

  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadMember();
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Rotate,
        preview: false,
      },
    ];
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    this.member.photos.length &&
      this.member.photos.map((photo) =>
        imageUrls.push({
          small: photo?.url,
          medium: photo?.url,
          big: photo?.url,
        })
      );
    return imageUrls;
  }

  loadMember() {
    this.memberService
      .getMember(this.route.snapshot.paramMap.get('username'))
      .subscribe((member) => {
        this.member = member;
        this.galleryImages = this.getImages();
      });
  }

  loadMessages() {
    this.messageService
      .getMessageThread(this.member.userName)
      .subscribe((messages) => {
        this.messages = messages;
      });
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      this.loadMessages();
    }
  }

  selectTab(tabId: number){
    this.memeberTabs.tabs[tabId].active = true;
  }
}
